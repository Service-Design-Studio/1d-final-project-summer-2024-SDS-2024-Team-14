require "rails_helper"
require_relative "../app/utils/llmapi"
require 'pdf-reader'
require "webmock/rspec"

RSpec.describe "llmapi", type: :request do
    let(:resume) {"spec/fixtures/mockresume.pdf"}
    let(:llm) {double(HTTParty.post)}
    let(:link) {double("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE")}
    before do
        stub_request(:post, "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD3eT6P2yBnWsO_9CvpEX8PWod0joKUUUE")
        .with(headers: {'Content-Type'=>'application/json'})
        .to_return(status: 200, body: { candidates: [{ content: { parts: [{ text: {"name": "Timothy Tang Long Zun", "date of birth": "10/04/2001", "student ID": "1006266", "degree": "Bachelor of Science (Design And Artificial Intelligence) with Design Accreditation", "highest education": "", "date obtained": "",
                  "overall GPA": "4.42", "institution name": "Singapore University of Technology and Design (SUTD)", "graduation date": "August 2026"} }] } }] }.to_json, headers: {})
    end

    scenario "succesfully use the llm to process the inputs" do
        # expect do
        #     # Extract text from PDF using pdf-reader
        #     reader = PDF::Reader.new(resume)
        #     text2 = ''
        #     reader.pages.each do |page|
        #         text2 += page.text
        #     end
        #     text = llm_process(text2, [
        #           "name", "date of birth", "student ID", "degree", "highest education", "date obtained",
        #           "overall GPA", "institution name", "graduation date"
        #         ])
        # end.to output("graduation date": "August 2026", "institution name": "Singapore University of Technology and Design (SUTD)", "overall GPA": "4.42", "date obtained": "", "highest education": "", "degree": "Bachelor of Science (Design And Artificial Intelligence) with Design Accreditation", "student ID": "1006626", "date of birth": "10/04/2001", "name": "Timothy Tang Long Zun").to_stdout
        # Extract text from PDF using pdf-reader
        reader = PDF::Reader.new(resume)
        text2 = ''
        reader.pages.each do |page|
            text2 += page.text
        end
        text = llm_process(text2, [
            "name", "date of birth", "student ID", "degree", "highest education", "date obtained",
            "overall GPA", "institution name", "graduation date"
            ])
        expect(text).to eq("name: Timothy Tang Long Zun, date of birth: 10/04/2001, student ID: 1006266, degree: Bachelor of Science (Design And Artificial Intelligence) with Design Accreditation, highest education: , date obtained: , overall GPA: 4.42, institution name: Singapore University of Technology and Design (SUTD), graduation date: August 2026")
    end
end