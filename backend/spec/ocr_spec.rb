require 'rails_helper'
include Ocr

describe 'Ocr processing' do

    let(:image_path1) {"spec/fixtures/mockpic.png"}
    let(:pdf_path1) {"spec/fixtures/mockarabic.pdf"}
    let(:pdf_path2) {"spec/fixtures/mockeng.pdf"}
    let(:pdf_path3) {"spec/fixtures/mockeng.docx"}
    let(:pdf_path4) {"spec/fixtures/sds.pdf"}
    let(:pdf_path5) {"spec/fixtures/blank.pdf"}
    let(:image_path2) {"spec/fixtures/blankpic.png"}
    let(:image_path) {"spec/fixtures/hehe.jpg"}

  describe '#process_image' do
    it 'performs OCR on an image and returns the text' do
      allow(RTesseract).to receive(:new).with(image_path1).and_return(double(to_s: 'Name\nText to speech\nPhone number'))
      allow(Google::Cloud::Translate::V2).to receive(:new).and_return(double(translate: double(text: 'Name\nText to speech\nPhone number')))
      expect(Ocr.process_image(image_path1)).to eq('Name\nText to speech\nPhone number')
    end

    it 'translates the text to English' do
      allow(RTesseract).to receive(:new).with(image_path1).and_return(double(to_s: 'Name\nText to speech\nPhone number'))
      allow(Google::Cloud::Translate::V2).to receive(:new).and_return(double(translate: double(text: 'Name\nText to speech\nPhone number')))
      expect(Ocr.process_image(image_path1)).to eq('Name\nText to speech\nPhone number')
    end

    it 'returns an error message if the OCR result is empty' do
      allow(RTesseract).to receive(:new).with(image_path2).and_return(double(to_s: ''))
      expect(Ocr.process_image(image_path2)).to eq('OCR result is empty.')
    end

    it 'returns an error message if an error occurs during OCR' do
      allow(RTesseract).to receive(:new).with(image_path).and_raise(RuntimeError, 'Error message')
      expect(Ocr.process_image(image_path)).to eq('Error processing image: Error message')
    end
  end

  describe '#process_pdf' do
    it 'extracts text from a PDF and returns the text' do
      allow(PDF::Reader).to receive(:new).with(pdf_path1).and_return(double(pages: [double(text: 'اسم\nالنص إلى الكلام\nرقم التليفون')]))
      allow(Google::Cloud::Translate::V2).to receive(:new).and_return(double(translate: double(text: 'Name\nText to speech\nPhone number')))
      expect(Ocr.process_pdf(pdf_path1)).to eq('Name\nText to speech\nPhone number')
    end

    it 'translates the text to English' do
      allow(PDF::Reader).to receive(:new).with(pdf_path1).and_return(double(pages: [double(text: 'اسم\nالنص إلى الكلام\nرقم التليفون')]))
      allow(Google::Cloud::Translate::V2).to receive(:new).and_return(double(translate: double(text: 'Name\nText to speech\nPhone number')))
      expect(Ocr.process_pdf(pdf_path1)).to eq('Name\nText to speech\nPhone number')
    end

    it 'returns an error message if the extracted text is empty' do
      allow(PDF::Reader).to receive(:new).with(pdf_path5).and_return(double(pages: [double(text: '')]))
      expect(Ocr.process_pdf(pdf_path5)).to eq('OCR result is empty.')
    end

    it 'returns an error message if an error occurs during PDF processing invalid file types' do
      allow(PDF::Reader).to receive(:new).with(pdf_path3).and_raise(RuntimeError, 'Error message')
      expect(Ocr.process_pdf(pdf_path3)).to eq('Error processing PDF: Error message')
    end
  end

  describe '#translate_text' do
    it 'translates text to English using Google Cloud Translate' do
      text = 'Bonjour'
      target_language = 'en'
      allow(Google::Cloud::Translate::V2).to receive(:new).and_return(double(translate: double(text: 'Hello')))
      expect(Ocr.translate_text(text, target_language)).to eq('Hello')
    end

    it 'returns an error message if an error occurs during translation' do
      text = 'Bonjour'
      target_language = 'en'
      allow(Google::Cloud::Translate::V2).to receive(:new).and_raise(RuntimeError, 'Error message')
      expect(Ocr.translate_text(text, target_language)).to eq('Error translating text: Error message')
    end
  end

    describe '#ocr' do
        it 'calls #process_image for image files' do
            expect(Ocr).to receive(:process_image).with(image_path1).and_return('Name\nText to speech\nPhone number')
            expect(Ocr.ocr(image_path1)).to eq('Name\nText to speech\nPhone number')
        end

        it 'calls #process_pdf for PDF files' do
            expect(Ocr).to receive(:process_pdf).with(pdf_path2).and_return('Name\nText to speech\nPhone number\nHello')
            expect(Ocr.ocr(pdf_path2)).to eq('Name\nText to speech\nPhone number\nHello')
        end

        it 'returns an error message for unsupported file types' do
            file_path = 'path/to/unsupported.txt'
            expect(Ocr.ocr(file_path)).to eq('Unsupported file type')
        end
    end

    describe '#download_active_storage_file' do
        let(:file) { double('file', filename: 'example.txt', download: 'file contents') }

        # it 'downloads the file from Active Storage and saves it to a local path' do
        #     expect(File).to receive(:open).with(Rails.root.join('tmp', 'example.txt'), 'wb').and_yield(double('file'))
        #     Ocr.download_active_storage_file(file)
        # end

        # it 'returns the local path of the downloaded file' do
        #     allow(File).to receive(:open).and_yield(double('file'))
        #     expect(Ocr.download_active_storage_file(file)).to eq(Rails.root.join('tmp', 'example.txt').to_s)
        # end

        it 'raises an error if the file cannot be downloaded' do
            allow(file).to receive(:download).and_raise(RuntimeError, 'Error message')
            expect { Ocr.download_active_storage_file(file) }.to raise_error(RuntimeError, 'Error message')
        end

        it 'raises an error if the file cannot be saved to the local path' do
            allow(File).to receive(:open).and_raise(RuntimeError, 'Error message')
            expect { Ocr.download_active_storage_file(file) }.to raise_error(RuntimeError, 'Error message')
        end
    end
end