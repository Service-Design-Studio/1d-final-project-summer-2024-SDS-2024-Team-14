require 'httparty'
require 'json'
require 'googleauth'

module Dialogagent
  def get_resp(prompt_text, session_id)
    base_url = "https://asia-southeast1-dialogflow.googleapis.com/v3/projects/gebirah-14/locations/asia-southeast1/agents/cce15a8e-975a-43a7-876a-f84f942198ac/sessions/#{session_id}:detectIntent"

    stdout, stderr, status = Open3.capture3("gcloud auth print-access-token")
    access_token = stdout.strip

    headers = {
      'Content-Type' => 'application/json; charset=utf-8',
      'Authorization' => "Bearer #{access_token}",
      'x-goog-user-project' => 'gebirah-14'
    }

    body = {
    queryInput: {
      text: {
        text: prompt_text,
      },
      languageCode: 'en'
    },
    queryParams: {
      timeZone: 'Asia/Singapore'
    }
  }.to_json  # Convert body to JSON format

    response = HTTParty.post("#{base_url}", headers: headers, body: body)
    if response.code == 200
      resp = JSON.parse(response.body)
    else
      nil
    end
  end
end