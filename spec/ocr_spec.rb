require "rails_helper"
require_relative "../utils/ocr"

RSpec.describe "ocr", type: :request do

    scenario "extract text from English PDF" do
        # <get engpdf file path>
        #check resp
        response = ocr()
        expect(response).to eq("Name, Text to speech, Phone number")
        puts (response)
    end

    # scenario "extract text from English PNG" do
    
    # end

    # scenario "extract text from Arabic PDF" do

    # end
end