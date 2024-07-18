require 'rails_helper'
require 'webmock/rspec'
require 'google/cloud/translate/v2'

include Ocr

RSpec.describe 'OCR processing' do
    let(:image_path) {"spec/fixtures/mockpic.png"}
    let(:pdf_path1) {"spec/fixtures/mockarabic.pdf"}
    let(:pdf_path2) {"spec/fixtures/mockeng.pdf"}
    let(:pdf_path3) {"spec/fixtures/mockeng.docx"}
    let(:pdf_path4) {"spec/fixtures/sds.pdf"}
    let(:resume) {"spec/fixtures/Timothy_Tang Resume.pdf"}
    let(:translate_client) { double('Google::Cloud::Translate::V2.new') }

    before do
        allow(Google::Cloud::Translate::V2).to receive(:new).and_return(translate_client)    
      
        # Stub translation
        allow(translate_client).to receive(:translate) do |text, options|
            {
                translations: [
                    {translated_text: 'Name\nText to speech\nPhone number'},
                    {translated_text: 'Name\nText to speech\nPhone number'},
                    {translated_text: 'Name\nText to speech\nPhone number\nHello'},
                    {translated_text: 'I drink water'}
                ]
            }
        end
    end

    scenario 'it processes an image and translates it' do
        # allow(RTesseract).to receive(:new).and_return("text: ")
        # expect(result).to eq("Translated text")
        # expect do
        #     result = ocr(image_path)
        # end.to output("yes").to_stdout
        result = ocr(image_path)
        expect(result[0]).to eq("Name\\nText to speech\\nPhone number")
    end

    scenario 'it processes a PDF and translates arabic text to english' do
        result = ocr(pdf_path1)
        expect(result[1]).to eq("Name\\nText to speech\\nPhone number")
    end

    scenario 'it processes a PDF and translates english text to english' do
        result = ocr(pdf_path2)
        expect(result[2]).to eq("Name\\nText to speech\\nPhone number\\nHello")
    end

    scenario 'it proccess an invalid file type and throws an error' do
        result = ocr(pdf_path3)
        expect(result).to eq("Unsupported file type")
    end
    
    scenario 'it processes file that does not exist and throws an error' do
        result = ocr(pdf_path4)
        expect(result).to include("Error processing PDF: ")
    end

    scenario 'it translates my malay text to english' do
        result = translate_text("Saya minum air", "en")
        expect(result[3]).to eq("I drink water")
    end
    
end