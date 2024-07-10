require "rails_helper"
require_relative "../utils/ocr"

RSpec.describe "ocr", type: :request do

    scenario "extract text from English PDF" do
        # get file path
        engpdf = "/fixtures/mockengpdf.pdf"
        response = ocr()
        # expect(response).to eq("Name, Text to speech, Phone number")
        puts response
    end

    # scenario "extract text from English PNG" do
        # engpng = "/fixtures/mockengpng.png"
        # response = ocr()
        # # expect(response).to eq()
        # puts response
    # end

    # scenario "extract text from Arabic PDF" do
        # arapng = "/fixtures/mockarabicpdf.pdf"
        # response = ocr()
        # # expect(response).to eq()
        # puts response
    # end
end