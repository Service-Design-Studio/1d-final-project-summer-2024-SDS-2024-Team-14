require 'rails_helper'
require 'dialogagent'

RSpec.describe ChatbotController, type: :controller do
  describe '#create' do
    let(:text) { 'Hello, world!' }
    let(:session_id) { '1234567890' }
    let(:access_token) { 'abc123' }

    before do
      allow(Open3).to receive(:capture3).with('gcloud auth print-access-token').and_return(['abc123', '', 0])
      allow(HTTParty).to receive(:post).with(any_args).and_return(double(code: 200, body: '{"queryResult": {"responseMessages": [{"text": {"text": ["Hello, world!"]}}]}}'))
    end

    it 'renders a JSON response with the message' do
      post :create, params: { text: text, userID: session_id }
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq({ message: 'Hello, world!' }.to_json)
    end

    it 'renders an error response if the API call fails' do
      allow(HTTParty).to receive(:post).with(any_args).and_return(double(code: 404, body: 'Not Found'))
      post :create, params: { text: text, userID: session_id }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to eq({ message: 'There was an issue sending your message to our bot. Please try again later.' }.to_json)
    end
  end
end
