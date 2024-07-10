require 'httparty'
require 'json'

GOOGLE_API_KEY = 'AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE'
BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=#{GOOGLE_API_KEY}"

def llm_process(prompt_text, parameters)

  headers = {
    'Content-Type' => 'application/json',
  }
  # education_transcript_parameters = [
  #   "name", "date of birth", "student ID", "degree", "highest education", "date obtained",
  #   "overall GPA", "institution name", "graduation date"
  # ]
  parameters_str = parameters.join(', ')
  body = {
    "contents": [{
          "parts":[{
            "text": "Extract [#{parameters_str}] from [#{prompt_text}]. Return me a json response only, starting with { and ending with } "
          }]
          }]
  }.to_json

  response = HTTParty.post("#{BASE_URL}", headers: headers, body: body)
  resp = JSON.parse(response.body)
  data = resp["candidates"][0]["content"]["parts"][0]["text"]
end