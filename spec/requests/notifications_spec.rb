require 'rails_helper'

RSpec.describe NotificationsController, type: :controller do
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

  describe 'GET #show' do
    context 'when user exists' do
      it 'returns user notifications' do
        notification1 = Notification.create(user_id: user.id,
      category: "Approval Pending",
      content: "Your refugee status is pending approval.",
      read: false)
      notification2 = Notification.create(user_id: user.id,
      category: "Approval Success",
      content: "Your refugee status has been approved.",
      read: false)

        get :show, params: { id: user.id }, format: :json

        expect(response).to be_ok
        expect(JSON.parse(response.body)).to eq([notification1, notification2].as_json)
      end
    end

    context 'when user does not exist' do
      it 'returns unprocessable entity error' do
        get :show, params: { id: 999 }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq('User does not exist')
      end
    end
  end

  describe 'PUT #mark_all_as_read' do
    context 'when user exists' do
      it 'marks notification as read' do
        notification = Notification.create(user_id: user.id,
        category: "Approval Pending",
        content: "Your refugee status is pending approval.",
        read: false)

        put :mark_all_as_read, params: { user_id: user.id, id: notification.id }, format: :json

        expect(response).to be_ok
        expect(notification.reload.read).to be true
      end
    end

    context 'when user does not exist' do
      it 'returns unprocessable entity error' do
        put :mark_all_as_read, params: { user_id: 999, id: 1 }, format: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['message']).to eq('User does not exist')
      end
    end
  end
end
