require 'rails_helper'

RSpec.describe DocumentController, type: :controller do
  before do
    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3e6P2yBnWsO_9CvpEX8PWod0joKUUUE")
    .with(headers: {'Content-Type'=>'application/json'})
    .to_return(status: 200, body: { candidates: [{ content: { parts: [{ text: {"name": "Timothy Tang Long Zun", "date of birth": "10/04/2001", "student ID": "1006266", "degree": "Bachelor of Science (Design And Artificial Intelligence) with Design Accreditation", "highest education": "", "date obtained": "",
                  "overall GPA": "4.42", "institution name": "Singapore University of Technology and Design (SUTD)", "graduation date": "August 2026"} }] } }] }.to_json, headers: {})
    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE").
    with(
      body: "{\"contents\":[{\"parts\":[{\"text\":\"Extract important information from the given text: Error processing PDF: PDF does not contain EOF marker for a education document. \\n              Provide the output in JSON format, strictly starting with { and ending with }. Do not include the word json in the response.\"}]}]}",
      headers: {
      'Accept'=>'*/*',
      'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
      'Content-Type'=>'application/json',
      'User-Agent'=>'Ruby'
      }).
    to_return(status: 200, body: "", headers: {})

    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE").
         with(
           body: "{\"contents\":[{\"parts\":[{\"text\":\"Extract important information from the given text: Unsupported file type for a education document. \\n              Provide the output in JSON format, strictly starting with { and ending with }. Do not include the word json in the response.\"}]}]}",
           headers: {
          'Accept'=>'*/*',
          'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
          'Content-Type'=>'application/json',
          'User-Agent'=>'Ruby'
           }).
         to_return(status: 200, body: "", headers: {})
    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3e6P2yBnWsO_9CvpEX8PWod0joKUUUE").
         with(
           headers: {
          'Content-Type'=>'application/json'
           })
    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3e6P2yBnWsO_9CvpEX8PWod0joKUUUE").
    with(
      headers: {
    'Content-Type'=>'application/json'
      })
    stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE").
      with(
        body: "{\"contents\":[{\"parts\":[{\"text\":\"Extract important information from the given text: Error processing PDF: PDF does not contain EOF marker for a education document. \\n              Provide the output in JSON format, strictly starting with { and ending with }. Do not include the word json in the response.\"}]}]}",
        headers: {
      'Accept'=>'*/*',
      'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
      'Content-Type'=>'application/json',
      'User-Agent'=>'Ruby'
        })
  end

  describe 'POST #create' do
    let(:user) { User.create(
      id: 1,
      email: 'test1@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser1",
      country: "Myanmar",
      ethnicity: 'Bantu',
      religion: "Buddhist",
      gender: "Female",
      date_birth: "10-06-2001",
      date_arrival: "10-06-2024",
      verification_status: "Pending approval"
    ) }
    
    let(:category) { 'education' }
    let(:file) { fixture_file_upload('spec/fixtures/mockresume.pdf') }
    let(:unsupported_file) { fixture_file_upload('spec/fixtures/example.txt') }

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

      it 'processes with a specific language' do
        post :create, params: { id: user.id, category: category, files: [file], language: 'french' }
        expect(response).to have_http_status(:ok)
      end

      it 'deletes the local file after processing' do
        expect(File).to receive(:delete).and_call_original
        post :create, params: { id: user.id, category: category, files: [file] }
      end

      it 'calls the notification service on success' do
        allow(NotificationService).to receive(:create_document_upload_success_notification).with(user.id, anything, category)
        post :create, params: { id: user.id, category: category, files: [file] }
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      it 'returns an error response when user is not found' do
        post :create, params: { id: 99999, category: category, files: [file] }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("User does not exist")
      end

      it 'returns an error response when file is not provided' do
        post :create, params: { id: user.id, category: category }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns an error response when the file is blurry or in an invalid format' do
        allow_any_instance_of(DocumentController).to receive(:llm_process).and_return(nil)
        post :create, params: {id: user.id, category: category, files: [file] }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("The document you uploaded was too blurry or it was in an invalid format. Please try again.")
      end

      it 'returns an error for unsupported file type' do
        post :create, params: { id: user.id, category: category, files: [unsupported_file] }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("Unsupported file type")
      end
    end

    it 'calls llm_process with correct parameters' do
      allow_any_instance_of(DocumentController).to receive(:llm_process).and_return({ important: 'test' })
      post :create, params: { id: user.id, category: category, files: [file] }
      expect(response).to have_http_status(:ok)
    end

    it 'handles llm_process errors' do
      allow_any_instance_of(DocumentController).to receive(:llm_process).and_raise(StandardError)
      post :create, params: { id: user.id, category: category, files: [file] }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['message']).to eq("Unsupported file type")
    end

    it 'creates a new document with multiple files' do
      files = [fixture_file_upload('spec/fixtures/mockresume.pdf'), fixture_file_upload('spec/fixtures/mockeng.docx')]
      post :create, params: { id: user.id, category: category, files: files }
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'GET #retrieve' do
    let(:user) { User.create(
      id: 1,
      email: 'test1@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser1",
      country: "Myanmar",
      ethnicity: 'Bantu',
      religion: "Buddhist",
      gender: "Female",
      date_birth: "10-06-2001",
      date_arrival: "10-06-2024",
      verification_status: "Pending approval"
    ) }
    
    let(:category) { 'education' }
    let!(:document) { Document.create(user: user, category: category) }

    context 'with valid parameters' do
      it 'returns a list of documents' do
        get :retrieve, params: { id: user.id, category: category }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['documents']).not_to be_empty
      end

      it 'returns documents without category filter' do
        get :retrieve, params: { id: user.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['documents']).not_to be_empty
      end
    end

    context 'with invalid parameters' do
      it 'returns an error response when user is not found' do
        get :retrieve, params: { id: 0 }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("User does not exist")
      end
    end

    context 'with no documents' do
      it 'returns an error response' do
        allow(User).to receive(:find).with(user.id) { user }
        allow(user).to receive(:documents) { double(where: []) }
        get :retrieve, params: { id: user.id, category: category }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("No documents found for this user")
      end
    end
    
    it 'returns a list of documents with correct structure' do
      get :retrieve, params: { id: user.id, category: category }
      documents = JSON.parse(response.body)['documents']
      expect(documents).not_to be_empty
      expect(documents.first).to include('id', 'name', 'status', 'file_url', 'important', 'category')
    end

    it 'retrieves documents with different categories' do
      document1 = Document.create(user: user, category: 'education')
      document2 = Document.create(user: user, category: 'work_experience')
      get :retrieve, params: { id: user.id, category: 'education' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['documents'].count).to eq(2)
    end

    it 'retrieves documents with different statuses' do
      document1 = Document.create(user: user, status: 'Pending')
      document2 = Document.create(user: user, status: 'Approved')
      get :retrieve, params: { id: user.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['documents'].count).to eq(3)
    end
  end

  describe '#status' do
    let(:user) { User.create(
      id: 1,
      email: 'test1@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser1",
      country: "Myanmar",
      ethnicity: 'Bantu',
      religion: "Buddhist",
      gender: "Female",
      date_birth: "10-06-2001",
      date_arrival: "10-06-2024",
      verification_status: "Pending approval"
    ) }

    let!(:document) { Document.create(id: 1, user: user, name: 'Test Document', status: 'Pending') }
    let(:params) { { id: document.id, status: 'Approved', message: 'Document approved' } }

    context 'when document exists' do
      it 'updates document status' do
        expect(document.status).not_to eq('Approved')
        put :status, params: params
        document.reload
        expect(document.status).to eq('Approved')
      end

      it 'sends approved notification' do
        expect(NotificationService).to receive(:document_approved_notification).with(document.user_id, document.name, params[:message])
        put :status, params: params
      end
    end

    context "when status is changed to Rejected" do
      it "updates the document status and sends a notification" do
        expect(NotificationService).to receive(:document_rejected_notification).with(document.user_id, document.name, "Document rejected")
        put :status, params: { id: document.id, status: "Rejected", message: "Document rejected" }
        document.reload
        expect(document.status).to eq("rejected")
        expect(response).to have_http_status(:ok)
      end
    end

    context 'when status is not changed' do
      let(:params1) { { id: document.id, status: 'Pending', message: 'Document status is already Pending. No change applied.' } }

      it 'does not update document status' do
        expect(document.status).to eq('Pending')
        put :status, params: params1
        document.reload
        expect(document.status).to eq('pending')
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
        expect(JSON.parse(response.body)['message']).to eq('Document does not exist')
      end
    end

    it 'does not send notification if status is unchanged' do
      expect(NotificationService).not_to receive(:document_approved_notification)
      put :status, params: { id: document.id, status: 'Pending', message: 'No change' }
    end

    it 'handles invalid status updates gracefully' do
      put :status, params: { id: document.id, status: 'InvalidStatus', message: 'Invalid status' }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)['message']).to eq("Invalid status")
    end

    it 'handles errors when updating document status' do
      allow_any_instance_of(Document).to receive(:update).and_raise(StandardError)
      put :status, params: { id: document.id, status: 'Approved', message: 'Document approved' }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end