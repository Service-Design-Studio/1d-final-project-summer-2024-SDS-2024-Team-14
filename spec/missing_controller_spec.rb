require 'rails_helper'

RSpec.describe MissingController, type: :controller do
  let(:user) do
    User.create!(
      email: 'test9@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: 'testUser1',
      country: 'Myanmar',
      ethnicity: 'Bantu',
      religion: 'Buddhist',
      gender: 'Female',
      date_birth: '2001-06-10',
      date_arrival: '2024-06-10',
      verification_status: 'Pending approval'
    )
  end

  let!(:missing_person) do
    MissingPerson.create!(
      user: user,
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      ethnicity: 'Caucasian',
      date_birth: Date.new(1993, 1, 15),
      matched_user_id: nil
    )
  end

  let(:valid_attributes) do
    { name: 'John Doe', age: 30, gender: 'Male', ethnicity: 'Caucasian', date_birth: '1993-01-15' }
  end

  let(:invalid_attributes) do
    { name: nil, age: nil, gender: nil, ethnicity: nil, date_birth: nil }
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new MissingPerson' do
        expect {
          post :create, params: { user_id: user.id }.merge(valid_attributes)
        }.to change(MissingPerson, :count).by(1)
      end

      it 'returns a success message' do
        post :create, params: { user_id: user.id }.merge(valid_attributes)
        expect(response).to have_http_status(:created)
        expect(response.body).to include("The missing person #{valid_attributes[:name]} has been created successfully")
      end
    end

    context 'with invalid params' do
      it 'does not create a new MissingPerson' do
        expect {
          post :create, params: { user_id: user.id }.merge(invalid_attributes)
        }.to_not change(MissingPerson, :count)
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns errors' do
        post :create, params: { user_id: user.id }.merge(invalid_attributes)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Name can't be blank")
      end
    end
  end

  describe 'DELETE #destroy' do
    context 'when the missing person exists' do
      it 'destroys the requested missing_person' do
        expect {
          delete :destroy, params: { id: missing_person.id }
        }.to change(MissingPerson, :count).by(-1)
      end

      it 'returns a success message' do
        delete :destroy, params: { id: missing_person.id }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('The missing person entry has been deleted successfully')
      end
    end

    context 'when the missing person does not exist' do
      it 'returns error message' do
        delete :destroy, params: { id: 'nonexistent_id' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Failed to delete missing person entry')
      end
    end
  end

  describe 'PUT #update' do
    let(:new_attributes) { { name: 'Jane Doe' } }

    context 'when the missing person exists' do
      it 'updates the requested missing_person' do
        put :update, params: { id: missing_person.id }.merge(new_attributes)
        missing_person.reload
        expect(missing_person.name).to eq('Jane Doe')
      end

      it 'returns a success message' do
        put :update, params: { id: missing_person.id }.merge(new_attributes)
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('Missing person updated successfully')
      end
    end

    context 'when the missing person does not exist' do
      it 'returns error if not found' do
        put :update, params: { id: -1, user_id: user.id }
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns errors for invalid updates' do
        put :update, params: { id: missing_person.id, missing_person: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Name can't be blank")
      end
    end
  end

  describe 'POST #upload' do
    let(:photo) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpeg') }

    context 'when the missing person exists' do
      it 'attaches a photo' do
        post :upload, params: { id: missing_person.id, photo: photo }
        missing_person.reload
        expect(missing_person.photo).to be_attached
      end

      it 'returns a success message' do
        post :upload, params: { id: missing_person.id, photo: photo }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("Your photo has been uploaded successfully for #{missing_person.name}")
      end

      it 'removes existing photo if no new photo is provided' do
        missing_person.photo.attach(photo)
        post :upload, params: { id: missing_person.id, photo: nil }
        missing_person.reload
        expect(missing_person.photo).not_to be_attached
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("Your attached photo has been removed successfully for #{missing_person.name}")
      end
    end

    context 'when the missing person does not exist' do
      it 'returns an error' do
        post :upload, params: { id: 'invalid_id', photo: photo }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Missing person does not exist')
      end
    end
  end

  describe 'GET #photo' do
    context 'with attached photo' do
      before { missing_person.photo.attach(fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpeg')) }

      it 'returns the photo URL' do
        get :photo, params: { id: missing_person.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to have_key('photo_url')
        expect(JSON.parse(response.body)['photo_url']).not_to be_empty
      end
    end

    context 'without attached photo' do
      it 'returns an empty photo URL' do
        get :photo, params: { id: missing_person.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to have_key('photo_url')
        expect(JSON.parse(response.body)['photo_url']).to eq('')
      end
    end

    context 'when the missing person does not exist' do
      it 'returns error if not found' do
        get :photo, params: { id: 'invalid_id' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('No missing people found')
      end
    end
  end

  describe 'GET #show' do
    context 'when the user has missing people' do
      it 'returns the missing people for the user' do
        get :show, params: { id: user.id }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to be_an(Array)
        expect(JSON.parse(response.body).first['name']).to eq('John Doe')
      end
    end

    context 'when the user has no missing people' do
      it 'returns error if no missing people found' do
        another_user = User.create!(email: 'test7@gmail.com', password: 'test123', password_confirmation: 'test123')
        get :show, params: { id: another_user.id }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('No missing people found')
      end
    end

    context 'when the user does not exist' do
      it 'returns an error' do
        get :show, params: { id: -1 }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('No missing people found')
      end
    end
  end
end