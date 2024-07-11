require "rails_helper"
require_relative "../app/utils/ocr"


RSpec.describe "ocr", type: :request do

    scenario "successfully extract files from english PDF files" do
        # get file path
        # engpdf = "spec\mockengpdf.pdf"
        # file = ocr(engpdf)
        # expect(file["message"]).to eq("Supported pdf type")
        # expect(file).to include(".pdf")
        expect do
            ocr("fixtures/mockeng.pdf")
        end.to output("Supported pdf type").to_stdout
    end

    # scenario "successfully extract text from English PDF" do
    #     # get file path
    #     engpdf = "./fixtures/mockengpdf.pdf"        
    #     response = process_pdf(engpdf)
    #     # expect(response).to eq("Name, Text to speech, Phone number")
    #     # puts response
    # end

    scenario "loaded wrong pdf file type" do
        # # get file path
        # engpdf = "/fixtures/mockengpdf.pdf"
        # response = ocr(process_pdf(engpdf))
        # # expect(response).to eq("Name, Text to speech, Phone number")
        # puts response
        expect do
            ocr("fixtures/mockeng.pdp")
        end.to output(a_string_including("Unsupported file type")).to_stdout
    end

    scenario "successfully extract text from English PNG" do
        # engpng = "/fixtures/mockengpng.png"
        # response = ocr()
        # # expect(response).to eq()
        # puts response
        expect do
            ocr("fixtures/mockpic.png")
        end.to output("Supported image type").to_stdout
    end

    scenario "successfully translate text from Arabic PDF" do
    #     arapng = "/fixtures/mockarabicpdf.pdf"
    #     response = ocr()
    #     # expect(response).to eq()
    #     puts response
    # end
        expect do
            ocr("fixtures/mockarabic.pdf")
        end.to output("Supported pdf type").to_stdout
    end
end