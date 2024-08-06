# # require 'rails_helper'

# # RSpec.describe MissingController, type: :controller do
# #     let(:user) { User.create(
# #         id: 1,
# #         email: 'test1@gmail.com',
# #         password: 'test123',
# #         password_confirmation: 'test123',
# #         "name": "testUser1",
# #         "country": "Myanmar",
# #         ethnicity: 'Bantu',
# #         "religion": "Buddhist",
# #         "gender": "Female",
# #         "date_birth": "10-06-2001",
# #         "date_arrival": "10-06-2024",
# #         "verification_status": "Pending approval"
# #         ) }
# #         let(:missing_person_attributes) do
# #           {
# #             name: 'John Doe',
# #             age: 30,
# #             gender: 'male',
# #             ethnicity: 'caucasian',
# #             date_birth: '1994-05-15'
# #           }
# #         end
        
# #   let(:photo) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpeg') }

# #   describe 'POST #create' do
# #     context 'with valid parameters' do
# #       it 'creates a new missing person' do
# #         expect {
# #           post :create, params: { user_id: user.id }.merge(missing_person_attributes)
# #         }.to change(MissingPerson, :count).by(1)

# #         expect(response).to have_http_status(:created)
# #         expect(JSON.parse(response.body)['message']).to eq("The missing person #{missing_person_attributes[:name]} has been created successfully")
# #       end
# #     end

# #     context 'with invalid parameters' do
# #       it 'does not create a new missing person' do
# #         expect {
# #           post :create, params: { user_id: user.id, name: '' }
# #         }.to_not change(MissingPerson, :count)

# #         expect(response).to have_http_status(:unprocessable_entity)
# #       end
# #     end
# #   end

# #   describe 'POST #upload' do
# #   let!(:missing_person) {
# #     MissingPerson.create(
# #       name: 'John Doe',
# #       age: 30,
# #       gender: 'Male',
# #       ethnicity: 'Caucasian',
# #       matched: false,
# #       date_birth: Date.new(1993, 1, 15),
# #       matched_user_id: nil
# #     )
# #   }
# #     context 'when photo is uploaded successfully' do
# #       it 'attaches a photo to the missing person' do
# #         post :upload, params: { id: missing_person.id, photo: photo }
# #         expect(response).to have_http_status(:ok)
# #         expect(JSON.parse(response.body)['message']).to eq("Your photo has been uploaded successfully for #{missing_person.name}")
# #         expect(missing_person.reload.photo).to be_attached
# #       end
# #     end

# #     context 'when no photo is uploaded' do
# #       it 'returns an error message' do
# #         post :upload, params: { id: missing_person.id }

# #         expect(response).to have_http_status(:unprocessable_entity)
# #         expect(JSON.parse(response.body)['message']).to eq("There was no photo uploaded. Please try again later")
# #       end
# #     end

# #     context 'when missing person does not exist' do
# #       it 'returns an error message' do
# #         post :upload, params: { id: -1, photo: photo }

# #         expect(response).to have_http_status(:unprocessable_entity)
# #         expect(JSON.parse(response.body)['message']).to eq("Missing person does not exist")
# #       end
# #     end
# #   end

# #   describe 'GET #show' do
# #     context 'when user has missing people' do
# #       let!(:missing_person) {
# #           MissingPerson.create(
# #             id: 1,
# #             name: 'John Doe',
# #             age: 30,
# #             gender: 'Male',
# #             ethnicity: 'Caucasian',
# #             matched: false,
# #             date_birth: Date.new(1993, 1, 15),
# #             matched_user_id: nil
# #           )}

# #       it 'returns the missing people' do
# #         get :show, params: { id: user.id }

# #         expect(response).to have_http_status(:ok)
# #         expect(JSON.parse(response.body).first['name']).to eq(missing_person.name)
# #       end
# #     end

# #     context 'when user has no missing people' do
# #       it 'returns an error message' do
# #         get :show, params: { id: -1 }

# #         expect(response).to have_http_status(:unprocessable_entity)
# #         expect(JSON.parse(response.body)['message']).to eq("No missing people found")
# #       end
# #     end
# #   end
# # end

# require 'rails_helper'

# RSpec.describe MissingController, type: :controller do
#   let(:user) { User.create(
#         id: 1,
#         email: 'test1@gmail.com',
#         password: 'test123',
#         password_confirmation: 'test123',
#         "name": "testUser1",
#         "country": "Myanmar",
#         ethnicity: 'Bantu',
#         "religion": "Buddhist",
#         "gender": "Female",
#         "date_birth": "10-06-2001",
#         "date_arrival": "10-06-2024",
#         "verification_status": "Pending approval"
#         ) }
#   let!(:missing_person) {
#         MissingPerson.create(
#           name: 'John Doe',
#           age: 30,
#           gender: 'Male',
#           ethnicity: 'Caucasian',
#           matched: false,
#           date_birth: Date.new(1993, 1, 15),
#           matched_user_id: nil
#         )
#       }
#   describe 'POST #create' do
#     context 'with valid parameters' do
#       let(:valid_attributes) do
#         {
#           user_id: user.id,
#           name: 'John Doe',
#           age: 30,
#           gender: 'male',
#           ethnicity: 'Hispanic',
#           date_birth: '1990-01-01'
#         }
#       end

#       it 'creates a new missing person' do
#         expect {
#           post :create, params: valid_attributes
#         }.to change(MissingPerson, :count).by(1)
#       end

#       it 'returns a created status' do
#         post :create, params: valid_attributes
#         expect(response).to have_http_status(:created)
#       end
#     end

#     context 'with invalid parameters' do
#       let(:invalid_attributes) do
#         {
#           user_id: user.id,
#           name: nil,
#           age: nil
#         }
#       end

#       it 'does not create a new missing person' do
#         expect {
#           post :create, params: invalid_attributes
#         }.to change(MissingPerson, :count).by(0)
#       end

#       it 'returns an unprocessable entity status' do
#         post :create, params: invalid_attributes
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe 'DELETE #destroy' do
#     context 'when the missing person exists' do
#       it 'deletes the missing person' do
#         missing_person
#         expect {
#           delete :destroy, params: { id: missing_person.id }
#         }.to change(MissingPerson, :count).by(-1)
#       end

#       it 'returns a success message' do
#         delete :destroy, params: { id: missing_person.id }
#         expect(response.body).to include('The missing person entry has been deleted successfully')
#       end
#     end

#     context 'when the missing person does not exist' do
#       it 'returns a not found status' do
#         delete :destroy, params: { id: 'nonexistent_id' }
#         expect(response).to have_http_status(:not_found)
#       end
#     end
#   end

#   describe 'PATCH #update' do
#     let(:new_attributes) do
#       {
#         name: 'Jane Doe',
#         age: 35
#       }
#     end

#     context 'when the missing person exists' do
#       it 'updates the missing person' do
#         patch :update, params: { id: missing_person.id, missing_person: new_attributes }
#         missing_person.reload
#         expect(missing_person.name).to eq('Jane Doe')
#         expect(missing_person.age).to eq(35)
#       end

#       it 'returns a success message' do
#         patch :update, params: { id: missing_person.id, missing_person: new_attributes }
#         expect(response.body).to include('Missing person updated successfully')
#       end
#     end

#     context 'when the missing person does not exist' do
#       it 'returns an unprocessable entity status' do
#         patch :update, params: { id: 'nonexistent_id', missing_person: new_attributes }
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe 'POST #upload' do
#     let(:file) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpg') }

#     context 'when the missing person exists' do
#       it 'attaches a photo' do
#         post :upload, params: { id: missing_person.id, photo: file }
#         expect(missing_person.photo).to be_attached
#       end

#       it 'returns a success message' do
#         post :upload, params: { id: missing_person.id, photo: file }
#         expect(response.body).to include('Your photo has been uploaded successfully')
#       end

#       it 'removes the photo if it is already attached and no new photo is provided' do
#         missing_person.photo.attach(file)
#         post :upload, params: { id: missing_person.id }
#         expect(missing_person.photo).not_to be_attached
#         expect(response.body).to include('Your attached photo has been removed successfully')
#       end
#     end

#     context 'when the missing person does not exist' do
#       it 'returns an unprocessable entity status' do
#         post :upload, params: { id: 'nonexistent_id', photo: file }
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end

#   describe 'GET #show' do
#     context 'when the user has missing people' do
#       it 'returns the list of missing people' do
#         get :show, params: { id: user.id }
#         expect(response.body).to include(missing_person.to_json)
#         expect(response).to have_http_status(:ok)
#       end
#     end

#     context 'when the user has no missing people' do
#       it 'returns a not found message' do
#         another_user = create(:user)
#         get :show, params: { id: another_user.id }
#         expect(response.body).to include('No missing people found')
#         expect(response).to have_http_status(:unprocessable_entity)
#       end
#     end
#   end
# end

# spec/controllers/missing_controller_spec.rb
# 
require 'rails_helper'

RSpec.describe MissingController, type: :controller do
  let(:user) do
    User.create(
      id: 1,
      email: 'test1@gmail.com',
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
    MissingPerson.create(
      user: user,
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      ethnicity: 'Caucasian',
      date_birth: Date.new(1993, 1, 15),
      matched_user_id: nil
    )
  end

  let(:valid_attributes) { { name: 'John Doe', age: 30, gender: 'Male', ethnicity: 'Caucasian', date_birth: '1993-01-15' } }
  let(:invalid_attributes) { { name: '', age: nil, gender: nil, ethnicity: nil, date_birth: nil } }

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
        expect(response.body).to include('The missing person John Doe has been created successfully')
      end
    end

    context 'with invalid params' do
      it 'does not create a new MissingPerson' do
        expect {
          post :create, params: { user_id: user.id }.merge(invalid_attributes)
        }.to change(MissingPerson, :count).by(0)
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
      it 'returns error if not found' do
        delete :destroy, params: { id: 'invalid_id' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Failed to delete missing person entry')
      end
    end
  end

  describe 'PUT #update' do
    let(:new_attributes) { { name: 'Jane Doe' } }

    context 'with valid params' do
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

    context 'with invalid params' do
      it 'returns error if not found' do
        put :update, params: { id: 99999 }.merge(new_attributes)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Missing person does not exist')
      end

      it 'returns errors for invalid updates' do
        put :update, params: { id: missing_person.id }.merge(invalid_attributes)
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("Name can't be blank")
      end
    end
  end

  describe 'POST #upload' do
    let(:photo) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpg') }

    context 'with valid photo' do
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
    end

    context 'without a photo' do
      before { missing_person.photo.attach(photo) }

      it 'removes existing photo' do
        post :upload, params: { id: missing_person.id, photo: nil }
        missing_person.reload
        expect(missing_person.photo).not_to be_attached
      end

      it 'returns a success message' do
        post :upload, params: { id: missing_person.id, photo: nil }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("Your attached photo has been removed successfully for #{missing_person.name}")
      end
    end

    it 'returns error if not found' do
      post :upload, params: { id: 'invalid_id', photo: photo }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include('Missing person does not exist')
    end
  end

  describe 'GET #photo' do
    context 'with attached photo' do
      before { missing_person.photo.attach(fixture_file_upload(Rails.root.join('spec', 'fixtures', 'photo.png'), 'image/jpg')) }

      it 'returns the photo URL' do
        get :photo, params: { id: missing_person.id }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('photo_url')
        expect(JSON.parse(response.body)['photo_url']).not_to be_empty
      end
    end

    context 'without attached photo' do
      it 'returns an empty photo URL' do
        get :photo, params: { id: missing_person.id }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('photo_url')
        expect(JSON.parse(response.body)['photo_url']).to eq('')
      end
    end

    it 'returns error if not found' do
      get :photo, params: { id: 'invalid_id' }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include('No missing people found')
    end
  end

  describe 'GET #show' do
    it 'returns the missing people for the user' do
      get :show, params: { id: user.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_an(Array)
      expect(JSON.parse(response.body).first['name']).to eq('John Doe')
    end

    it 'returns error if user not found' do
      get :show, params: { id: 'invalid_id' }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include('No missing people found')
    end
  end
end
