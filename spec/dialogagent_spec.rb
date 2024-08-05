# require 'webmock'
# require 'googleauth'
# require_relative '../lib/dialogagent'
# require "rails_helper"

# RSpec.describe Dialogagent do
#   include Dialogagent

#   let(:prompt_text) { "Hello, how are you?" }
#   let(:session_id) { "123456" }
#   let(:base_url) { "https://asia-southeast1-dialogflow.googleapis.com/v3/projects/gebirah-14/locations/asia-southeast1/agents/cce15a8e-975a-43a7-876a-f84f942198ac/sessions/#{session_id}:detectIntent" }
#   let(:access_token) { "fake-access-token" }
#   let(:response_body) {
#     {
#       queryResult: {
#         responseMessages: [
#           { text: { text: ["I am fine, thank you!"] } }
#         ]
#       }
#     }.to_json
#   }
#   let(:headers) {
#     {
#       'Content-Type' => 'application/json; charset=utf-8',
#       'Authorization' => "Bearer #{access_token}",
#       'x-goog-user-project' => 'gebirah-14'
#     }
#   }

#   before do
#     authorizer = instance_double("Google::Auth::UserRefreshCredentials")
#     allow(Google::Auth).to receive(:get_application_default).and_return(authorizer)
#     allow(authorizer).to receive(:fetch_access_token!).and_return('access_token' => access_token)

#     stub_request(:post, base_url)
#       .with(headers: headers, body: { queryInput: { text: { text: prompt_text }, languageCode: 'en' }, queryParams: { timeZone: 'Asia/Singapore' } }.to_json)
#       .to_return(status: 200, body: response_body, headers: { 'Content-Type' => 'application/json' })
#   end

#   it "returns the response text when the API call is successful" do
#     expect(get_resp(prompt_text, session_id)).to eq("I am fine, thank you!")
#   end

#   it "returns nil when the API call fails" do
#     stub_request(:post, base_url)
#       .with(headers: headers, body: { queryInput: { text: { text: prompt_text }, languageCode: 'en' }, queryParams: { timeZone: 'Asia/Singapore' } }.to_json)
#       .to_return(status: 500, body: "", headers: { 'Content-Type' => 'application/json' })

#     expect(get_resp(prompt_text, session_id)).to be_nil
#   end
# end

require 'rails_helper'
require 'webmock/rspec'
require 'json'
require_relative '../lib/dialogagent' # Adjust the path as necessary

RSpec.describe Dialogagent do
  include Dialogagent

  let(:session_id) { 'test-session-id' }
  let(:prompt_text) { 'Hello' }
  let(:base_url) { "https://asia-southeast1-dialogflow.googleapis.com/v3/projects/gebirah-14/locations/asia-southeast1/agents/cce15a8e-975a-43a7-876a-f84f942198ac/sessions/#{session_id}:detectIntent" }
  let(:access_token) { 'test-access-token' }
  
  before do
    # Mock the Google Auth library to return a fixed access token
    allow_any_instance_of(Google::Auth::Credentials).to receive(:fetch_access_token!).and_return({'access_token' => access_token})

    # Mock the API response
    stub_request(:post, base_url)
      .with(
        headers: {
          'Content-Type' => 'application/json; charset=utf-8',
          'Authorization' => "Bearer #{access_token}",
          'x-goog-user-project' => 'gebirah-14'
        },
        body: {
          queryInput: {
            text: {
              text: prompt_text,
            },
            languageCode: 'en'
          },
          queryParams: {
            timeZone: 'Asia/Singapore'
          }
        }.to_json
      )
      .to_return(status: 200, body: {
        queryResult: {
          responseMessages: [
            { text: { text: ["Response from Dialogflow"] } }
          ]
        }
      }.to_json, headers: { 'Content-Type' => 'application/json' })
  end

  it 'returns the expected response when the API call is successful' do
    response = get_resp(prompt_text, session_id)
    expect(response).to eq('Response from Dialogflow')
  end

  it 'returns nil when the API call fails' do
    stub_request(:post, base_url).to_return(status: 500)
    response = get_resp(prompt_text, session_id)
    expect(response).to be_nil
  end
end