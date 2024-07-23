require 'rails_helper'
require 'webmock/rspec'
require 'google/cloud/translate/v2'
require 'helper'

include Ocr
RSpec.describe 'OCR processing' do
    let(:image_path) {"spec/fixtures/mockpic.png"}
    let(:pdf_path1) {"spec/fixtures/mockarabic.pdf"}
    let(:pdf_path2) {"spec/fixtures/mockeng.pdf"}
    let(:pdf_path3) {"spec/fixtures/mockeng.docx"}
    let(:pdf_path4) {"spec/fixtures/sds.pdf"}
    let(:resume) {"spec/fixtures/Timothy_Tang Resume.pdf"}
    let(:project) { "test" }
    let(:credentials) { OpenStruct.new(client: OpenStruct.new(updater_proc: Proc.new {})) }
    let(:translate) { Google::Cloud::Translate::V2::Api.new(Google::Cloud::Translate::V2::Service.new(project, credentials)) }

    describe Google::Cloud::Translate::V2::Api, :translate, :mock_translate do
        it "translates a single input with from spanish to english" do
            mock = Minitest::Mock.new
            translations_resource = { translatedText: "Hola" }
            list_translations_resource = JSON.parse({ translations: [translations_resource] }.to_json)
            mock.expect :translate, list_translations_resource, [["Hello"]], to: "es", model: nil, cid: nil, format: nil, from: "en"

            translate.service = mock
            translation = translate.translate "Hello", to: "es", from: "en"
            expect(translation.text).to eq "Hola"
        end

        scenario 'it translates my malay text to english' do
            mock = Minitest::Mock.new
            translations_resource = { translatedText: "I drink water" }
            list_translations_resource = JSON.parse({ translations: [translations_resource] }.to_json)
            mock.expect :translate, list_translations_resource, [["Saya minum air"]], to: "en", model: nil, cid: nil, format: nil, from: "ms"

            translate.service = mock
            translation = translate.translate "Saya minum air", to: "en", from: "ms"
            expect(translation.text).to eq "I drink water"
        end

        scenario 'it processes a PDF and translates arabic text to english' do
            allow(Ocr).to receive(:ocr).and_return(:process_pdf)
            text = double("Ocr", :process_pdf => "اسم\nالنص إلى الكلام\nرقم التليفون")
            # "اسم\nالنص إلى الكلام\nرقم التليفون"
            mock = Minitest::Mock.new
            translations_resource = { translatedText: "Name\nText to speech\nPhone number" }
            list_translations_resource = JSON.parse({ translations: [translations_resource] }.to_json)
            mock.expect :translate, list_translations_resource, [[text]], to: "en", model: nil, cid: nil, format: nil, from: "ar"

            translate.service = mock
            translation = translate.translate text, to: "en", from: "ar"
            expect(translation.text).to eq "Name\nText to speech\nPhone number"
        end

        scenario 'it processes a PDF and translates english text to english' do
            allow(Ocr).to receive(:ocr).and_return(:process_pdf)
            text = double("Ocr", :process_pdf => "Name\nText to speech\nPhone number\nHello")

            mock = Minitest::Mock.new
            translations_resource = { translatedText: "Name\nText to speech\nPhone number\nHello" }
            list_translations_resource = JSON.parse({ translations: [translations_resource] }.to_json)
            mock.expect :translate, list_translations_resource, [[text]], to: "en", model: nil, cid: nil, format: nil, from: "en"

            translate.service = mock
            translation = translate.translate text, to: "en", from: "en"
            expect(translation.text).to eq "Name\nText to speech\nPhone number\nHello"
        end

        scenario 'it processes a PNG and translated the english text to english' do
            allow(Ocr).to receive(:ocr).and_return(:process_image)
            image = double("Ocr", :process_image => "Name\nText to speech\nPhone number")

            mock = Minitest::Mock.new
            translations_resource = { translatedText: "Name\nText to speech\nPhone number" }
            list_translations_resource = JSON.parse({ translations: [translations_resource] }.to_json)
            mock.expect :translate, list_translations_resource, [[image]], to: "en", model: nil, cid: nil, format: nil, from: "ar"

            translate.service = mock
            translation = translate.translate image, to: "en", from: "ar"
            expect(translation.text).to eq "Name\nText to speech\nPhone number"
        end 
    end

    scenario 'it proccess an invalid file type and throws an error' do
        result = ocr(pdf_path3)
        expect(result).to eq("Unsupported file type")
    end
    
    scenario 'it processes file that does not exist and throws an error' do
        result = ocr(pdf_path4)
        expect(result).to include("Error processing PDF: ")
    end

end