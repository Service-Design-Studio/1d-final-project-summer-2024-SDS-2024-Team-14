require 'rails_helper'

RSpec.describe DocumentController, type: :controller do
    before do
        stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE")
        .with(headers: {'Content-Type'=>'application/json'})
        .to_return(status: 200, body: { candidates: [{ content: { parts: [{ text: {"name": "Timothy Tang Long Zun", "date of birth": "10/04/2001", "student ID": "1006266", "degree": "Bachelor of Science (Design And Artificial Intelligence) with Design Accreditation", "highest education": "", "date obtained": "",
                  "overall GPA": "4.42", "institution name": "Singapore University of Technology and Design (SUTD)", "graduation date": "August 2026"} }] } }] }.to_json, headers: {})
    end
    describe 'POST #create' do
        let(:user) { User.create(
            id: 1,
            email: 'test1@gmail.com',
            password: 'test123',
            password_confirmation: 'test123',
            "name": "testUser1",
            "country": "Myanmar",
            ethnicity: 'Bantu',
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024",
            "verification_status": "Pending approval"
            ) }
        let(:category) { 'education' }
        let(:file) { fixture_file_upload('spec/fixtures/mockresume.pdf') }
        let(:fileno) { fixture_file_upload('spec/fixtures/mockeng.docx') }

        context 'with valid parameters' do
            it 'creates a new document' do
                expect {
                post :create, params: { id: user.id, category: category, files: [file] }
                }.to change(Document, :count).by(1)
            end

            it 'returns a success response' do
                post :create, params: { id: user.id, category: category, files: [file] }
                expect(response).to have_http_status(:ok)
            end
        end

        context 'with invalid parameters' do
            it 'returns an error response when user is not found' do
                post :create, params: {id: 2, category: category, files: [file] }
                expect(response).to have_http_status(:unprocessable_entity)
                expect(JSON.parse(response.body)['message']).to eq("User does not exist")
            end

            it 'returns an error response when file is not provided' do
                post :create, params: { id: user.id, category: category }
                expect(response).to have_http_status(:unprocessable_entity)
            end

            it 'returns an error response when the file is blurry or in the incorrect format' do
              allow_any_instance_of(DocumentController).to receive(:llm_process).and_return(nil)
              post :create, params: {id: user.id, category: category, files: [fileno] }
              expect(response).to have_http_status(:unprocessable_entity)
              expect(JSON.parse(response.body)['message']).to eq("The document you uploaded was too blurry or it was in an invalid format. Please try again.")
            end      
        end
    end

    describe 'GET #retrieve' do
        let(:user) { User.create(
            id: 1,
            email: 'test1@gmail.com',
            password: 'test123',
            password_confirmation: 'test123',
            "name": "testUser1",
            "country": "Myanmar",
            ethnicity: 'Bantu',
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024",
            "verification_status": "Pending approval"
            ) }
        let(:category) { 'education' }
        let!(:document) { Document.create(user: user, category: category) }

        context 'with valid parameters' do
            it 'returns a list of documents' do
                get :retrieve, params: { id: user.id, category: category }
                expect(response).to have_http_status(:ok)
                expect(JSON.parse(response.body)['documents']).not_to be_empty
            end
        end

        context 'with invalid parameters' do
            it 'returns an error response when user is not found' do
                get :retrieve, params: {id: 2, category: category }
                expect(response).to have_http_status(:unprocessable_entity)
                expect(JSON.parse(response.body)['message']).to eq("User does not exist")
            end
          end

        context 'with no documents' do
            it 'returns an error response' do
              allow(User).to receive(:find).with(user.id.to_s) {user} #idk why need user.id to be string, if not keep failing
              allow(user).to receive(:documents) { double(where: []) }
                get :retrieve, params: { id: user.id, category: category } 
                expect(response).to have_http_status(:unprocessable_entity)
                expect(JSON.parse(response.body)['message']).to eq("No documents found for this user")
            end
        end
    end

    describe '#status' do
    let(:user) { User.create(
            id: 1,
            email: 'test1@gmail.com',
            password: 'test123',
            password_confirmation: 'test123',
            "name": "testUser1",
            "country": "Myanmar",
            ethnicity: 'Bantu',
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024",
            "verification_status": "Pending approval"
            ) }
    let!(:document) { Document.create(id: 1, user: user, name: 'Test Document', status: 'Pending') }
    let(:params) { { id: document.id,  status: 'Approved', message: 'Document approved' } }

    context 'when document exists' do
      it 'updates document status' do
        expect(document.status).not_to eq('Approved')
        put :status, params: { id: document.id,  status: 'Approved', message: 'Document approved' }
        document.reload
        expect(document.status).to eq('Approved')
      end

      it 'sends approved notification' do
        expect(NotificationService).to receive(:document_approved_notification).with(document.user_id, document.name, params[:message])
        put :status, params: { id: document.id,  status: 'Approved', message: 'Document approved' }
      end
    end

    context "when status is changed to Rejected" do
        it "updates the document status and sends a notification" do
          allow(NotificationService).to receive(:document_rejected_notification)
          post :status, params: { id: document.id, status: "Rejected", message: "Document rejected" }
          document.reload
          expect(document.status).to eq("Rejected")
          expect(NotificationService).to have_received(:document_rejected_notification).with(document.user_id, document.name, "Document rejected")
          expect(response).to have_http_status(:ok)
        end
    end

    context 'when status is not changed' do
      let(:params) { { id: document.id,  status: 'Pending', message: 'Document pending' } }
        let(:params1) { { id: document.id, status: 'Pending', message: 'Document status is already Pending. No change applied.' } }

        it 'does not update document status' do
          expect(document.status).to eq(params[:status])
          put :status, params: params1
          document.reload
          expect(document.status).to eq(params1[:status])
        end

        it 'returns message indicating no change' do
          put :status, params: params1
          expect(response).to have_http_status(:ok)
          expect(JSON.parse(response.body)['message']).to eq("Document status is already Pending. No change applied.")
        end
      end

    context 'when document does not exist' do
      let(:params) { { id: 0, status: 'Approved', message: 'Test message' } }

      it 'returns unprocessable entity status' do
        put :status, params: params
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns error message' do
        put :status, params: params
        expect(JSON.parse(response.body)['message']).to eq('Document does not exist')
      end
    end
  end
end
