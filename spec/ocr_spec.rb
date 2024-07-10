require "rails_helper"
require_relative "../app/utils/ocr"

RSpec.describe "ocr", type: :request do

    scenario "successfully detect PDF files" do
        # get file path
        engpdf = "./fixtures/mockengpdf.pdf"
        file = ocr(engpdf)
        # expect(file["message"]).to eq("Supported pdf type")
        expect(file).to_include(".pdf")
    end

    scenario "successfully extract text from English PDF" do
        # get file path
        engpdf = "./fixtures/mockengpdf.pdf"        
        response = process_pdf(engpdf)
        # expect(response).to eq("Name, Text to speech, Phone number")
        puts response
    end

    # scenario "failed to extract text from English PDF" do
    #     # get file path
    #     engpdf = "/fixtures/mockengpdf.pdf"
    #     response = ocr(process_pdf(engpdf))
    #     # expect(response).to eq("Name, Text to speech, Phone number")
    #     puts response
    # end

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