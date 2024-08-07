require 'rails_helper'

RSpec.describe ChatbotController, type: :controller do
  describe 'POST #create' do
    let(:valid_params) { { text: 'Hello', userID: '123' } }
    let(:invalid_params) { { text: '', userID: '' } }

    context 'when get_resp returns a response' do
      before do
        # Mock the get_resp method to return a valid response
        allow_any_instance_of(ChatbotController).to receive(:get_resp).and_return('Valid response')
        post :create, params: valid_params
      end

      it 'returns a success status' do
        expect(response).to have_http_status(:ok)
      end

      it 'returns the correct message' do
        expect(JSON.parse(response.body)).to eq({ 'message' => 'Valid response' })
      end
    end

    context 'when get_resp returns nil' do
      before do
        # Mock the get_resp method to return nil
        allow_any_instance_of(ChatbotController).to receive(:get_resp).and_return(nil)
        post :create, params: valid_params
      end

      it 'returns an unprocessable entity status' do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it 'returns the error message' do
        expect(JSON.parse(response.body)).to eq({ 'message' => 'There was an issue sending your message to our bot. Please try again later.' })
      end
    end
  end
end
