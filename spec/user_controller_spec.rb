# spec/controllers/users_controller_spec.rb
require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:valid_attributes) {
    { email: 'test@example.com', password: 'password', password_confirmation: 'password', name: 'Test User', country: 'Test Country', religion: 'Test Religion', ethnicity: 'Test Ethnicity', gender: 'Test Gender', date_birth: '2000-01-01', date_arrival: '2024-01-01' }
  }

  let(:invalid_attributes) {
    { email: '', password: 'password', password_confirmation: 'password', name: 'Test User' }
  }

  describe 'GET #index' do
    it 'returns a success response' do
      User.create! valid_attributes
      get :index
      expect(response).to be_successful
    end
  end

  describe 'GET #show' do
    context 'with valid id' do
      it 'returns a success response' do
        user = User.create! valid_attributes
        get :show, params: { id: user.to_param }
        expect(response).to be_successful
      end
    end

    context 'with invalid id' do
      it 'returns a not found response' do
        get :show, params: { id: 'invalid' }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('User does not exist')
      end
    end
  end

  describe 'POST #create' do
    context 'with valid parameters' do
      it 'creates a new User' do
        expect {
          post :create, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it 'renders a JSON response with the new user' do
        post :create, params: { user: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.body).to include('Signup for user Test User successful')
      end
    end

    context 'with invalid parameters' do
      it 'does not create a new User' do
        expect {
          post :create, params: { user: invalid_attributes }
        }.to change(User, :count).by(0)
      end

      it 'renders a JSON response with errors for the new user' do
        post :create, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("can't be blank")
      end
    end
  end
end
