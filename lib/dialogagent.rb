require 'httparty'
require 'json'

module Dialogagent
  def get_resp(prompt_text, session_id)
    begin
      base_url = "https://asia-southeast1-dialogflow.googleapis.com/v3/projects/gebirah-14/locations/asia-southeast1/agents/cce15a8e-975a-43a7-876a-f84f942198ac/sessions/#{session_id}:detectIntent"

      # stdout, stderr, status = Open3.capture3("gcloud auth print-access-token")
      # access_token = stdout.strip
      access_token = "ya29.a0AXooCguln4MhuzNu2BfpTn_pDyTV_kSQt97PCulg8H4CIUsfBX8fVr7AsUpOTPJ-rk9PrmFk8B6z-4Gi8axFN3DYUOolwP9kS-9BR2UzewZWVq7jKy-JMPCv5zK-T_KyTu0jq2M9R3xaCq7mgaLlhFa4VrHgL2JGcEVtdNoK1eaAaCgYKAaESARMSFQHGX2MiSkgyfuBytGGwpz3VKKWDWw0179"

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