require 'httparty'
require 'json'
require 'googleauth'

module Dialogagent
  def get_resp(prompt_text, session_id)
    begin
      base_url = "https://asia-southeast1-dialogflow.googleapis.com/v3/projects/gebirah-14/locations/asia-southeast1/agents/cce15a8e-975a-43a7-876a-f84f942198ac/sessions/#{session_id}:detectIntent"
      # stdout, stderr, status = Open3.capture3("gcloudauth print-access-token")
      # access_token = stdout.strip
      # Load the service account credentials
      scopes = ['https://www.googleapis.com/auth/cloud-platform']
      authorizer = Google::Auth.get_application_default(scopes)
      access_token = authorizer.fetch_access_token!['access_token']

      # Fetch the access token
      authorizer.fetch_access_token!
      access_token = authorizer.access_token

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

      # make api request
      response = HTTParty.post("#{base_url}", headers: headers, body: body)
      if response.code == 200
        parsed_resp = JSON.parse(response.body)
        resp = parsed_resp["queryResult"]["responseMessages"][0]["text"]["text"][0]
      else
        nil
      end
    end
    rescue Errno::ENOENT => e
      Rails.logger.error("Command not found: #{e.message}")
      nil
    rescue => e
      Rails.logger.error("An error occurred: #{e.message}")
      nil
  end
end