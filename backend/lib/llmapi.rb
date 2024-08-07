require 'httparty'
require 'json'

GOOGLE_API_KEY = Rails.application.credentials.google_api_key
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=#{GOOGLE_API_KEY}"

module Llmapi
  def llm_process(prompt_text, category)

    headers = {
      'Content-Type' => 'application/json',
    }
    # parameters_str = parameters.join(', ')
    body = {
      "contents": [{
            "parts":[{
              # "text": "Extract the following parameters: #{parameters_str} from the given text: #{prompt_text}. 
              # Provide the output in JSON format, starting with { and ending with }. Exclude any parameters that cannot be found"
              "text": "Extract important information from the given text: #{prompt_text} for a #{category} document. 
              Provide the output in JSON format, strictly starting with { and ending with }. Do not include the word json in the response."
            }]
            }]
    }.to_json

    response = HTTParty.post("#{BASE_URL}", headers: headers, body: body)
    resp = JSON.parse(response.body)
    data = resp["candidates"][0]["content"]["parts"][0]["text"]
  end
end
