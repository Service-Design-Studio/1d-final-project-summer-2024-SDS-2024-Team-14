require 'rails_helper'

RSpec.describe MissingController, type: :controller do
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
        let(:missing_person_attributes) do
          {
            name: 'John Doe',
            age: 30,
            gender: 'male',
            ethnicity: 'caucasian',
            date_birth: '1994-05-15'
          }
        end
        
  let(:photo) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpeg') }

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new missing person' do
        expect {
          post :create, params: { user_id: user.id }.merge(missing_person_attributes)
        }.to change(MissingPerson, :count).by(1)

        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['message']).to eq("The missing person #{missing_person_attributes[:name]} has been created successfully")
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new missing person' do
        expect {
          post :create, params: { user_id: user.id, name: '' }
        }.to_not change(MissingPerson, :count)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe 'POST #upload' do
  let!(:missing_person) {
    MissingPerson.create(
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      ethnicity: 'Caucasian',
      matched: false,
      date_birth: Date.new(1993, 1, 15),
      matched_user_id: nil
    )
  }
    context 'when photo is uploaded successfully' do
      it 'attaches a photo to the missing person' do
        post :upload, params: { id: missing_person.id, photo: photo }
        puts response.body
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['message']).to eq("Your photo has been uploaded successfully for #{missing_person.name}")
        expect(missing_person.reload.photo).to be_attached
      end
    end

    context 'when no photo is uploaded' do
      it 'returns an error message' do
        post :upload, params: { id: missing_person.id }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("There was no photo uploaded. Please try again later")
      end
    end

    context 'when missing person does not exist' do
      it 'returns an error message' do
        post :upload, params: { id: -1, photo: photo }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("Missing person does not exist")
      end
    end
  end

  describe 'GET #show' do
    context 'when user has missing people' do
      let!(:missing_person) {
          MissingPerson.create(
            id: 1,
            name: 'John Doe',
            age: 30,
            gender: 'Male',
            ethnicity: 'Caucasian',
            matched: false,
            date_birth: Date.new(1993, 1, 15),
            matched_user_id: nil
          )}

      it 'returns the missing people' do
        get :show, params: { id: user.id }

        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body).first['name']).to eq(missing_person.name)
      end
    end

    context 'when user has no missing people' do
      it 'returns an error message' do
        get :show, params: { id: -1 }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq("No missing people found")
      end
    end
  end
end
