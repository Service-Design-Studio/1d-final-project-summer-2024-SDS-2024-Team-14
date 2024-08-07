require 'rails_helper'

RSpec.describe Ocr do
  include Ocr

  let(:image_path) { 'path/to/image.png' }
  let(:pdf_path) { 'path/to/document.pdf' }
  let(:language) { 'english' }
  let(:text) { 'Sample text' }
  let(:translated_text) { 'Translated text' }

  before do
    allow(Rails.logger).to receive(:debug)
  end

  describe '#process_image' do
    context 'when OCR is successful' do
      before do
        ocr_double = double('RTesseract', to_s: text)
        allow(RTesseract).to receive(:new).with(image_path, lang: 'eng').and_return(ocr_double)
        allow(self).to receive(:translate_text).with(text, 'en').and_return(translated_text)
      end

      it 'returns the translated text' do
        result = process_image(image_path, language)
        expect(result).to eq(translated_text)
      end
    end

    context 'when OCR result is empty' do
      before do
        ocr_double = double('RTesseract', to_s: '')
        allow(RTesseract).to receive(:new).with(image_path, lang: 'eng').and_return(ocr_double)
      end

      it 'returns an empty OCR result message' do
        result = process_image(image_path, language)
        expect(result).to eq('OCR result is empty.')
      end
    end

    context 'when an error occurs during OCR' do
      before do
        allow(RTesseract).to receive(:new).with(image_path, lang: 'eng').and_raise(StandardError.new('OCR error'))
      end

      it 'returns an error message' do
        result = process_image(image_path, language)
        expect(result).to eq('Error processing image: OCR error')
      end
    end
  end

  describe '#process_pdf' do
    context 'when PDF text extraction is successful' do
      before do
        pdf_reader_double = double('PDF::Reader', pages: [double('Page', text: text)])
        allow(PDF::Reader).to receive(:new).with(pdf_path).and_return(pdf_reader_double)
        allow(self).to receive(:translate_text).with(text, 'en').and_return(translated_text)
      end

      it 'returns the translated text' do
        result = process_pdf(pdf_path)
        expect(result).to eq(translated_text)
      end
    end

    context 'when PDF text extraction result is empty' do
      before do
        pdf_reader_double = double('PDF::Reader', pages: [double('Page', text: '')])
        allow(PDF::Reader).to receive(:new).with(pdf_path).and_return(pdf_reader_double)
      end

      it 'returns an empty OCR result message' do
        result = process_pdf(pdf_path)
        expect(result).to eq('OCR result is empty.')
      end
    end

    context 'when an error occurs during PDF text extraction' do
      before do
        allow(PDF::Reader).to receive(:new).with(pdf_path).and_raise(StandardError.new('PDF error'))
      end

      it 'returns an error message' do
        result = process_pdf(pdf_path)
        expect(result).to eq('Error processing PDF: PDF error')
      end
    end
  end

  describe '#translate_text' do
    context 'when translation is successful' do
      before do
        translate_double = double('Google::Cloud::Translate::V2', translate: double('Translation', text: translated_text))
        allow(Google::Cloud::Translate::V2).to receive(:new).and_return(translate_double)
      end

      it 'returns the translated text' do
        result = translate_text(text, 'en')
        expect(result).to eq(translated_text)
      end
    end

    context 'when an error occurs during translation' do
      before do
        allow(Google::Cloud::Translate::V2).to receive(:new).and_raise(StandardError.new('Translation error'))
      end

      it 'returns an error message' do
        result = translate_text(text, 'en')
        expect(result).to eq('Error translating text: Translation error')
      end
    end
  end

  describe '#ocr' do
    context 'when the file is an image' do
      before do
        allow(self).to receive(:process_image).with(image_path, language).and_return(translated_text)
      end

      it 'processes the image' do
        result = ocr(image_path, language)
        expect(result).to eq(translated_text)
      end
    end

    context 'when the file is a PDF' do
      before do
        allow(self).to receive(:process_pdf).with(pdf_path).and_return(translated_text)
      end

      it 'processes the PDF' do
        result = ocr(pdf_path, language)
        expect(result).to eq(translated_text)
      end
    end

    context 'when the file type is unsupported' do
      let(:unsupported_file_path) { 'path/to/file.txt' }

      it 'returns an unsupported file type message' do
        result = ocr(unsupported_file_path, language)
        expect(result).to eq('Unsupported file type')
      end
    end
  end

    describe '#download_active_storage_file' do
    let(:file) { double('file', filename: 'example.txt', download: 'file contents') }

    it 'downloads the file from Active Storage and saves it to a local path' do
      expect(File).to receive(:open).with(Rails.root.join('tmp', 'example.txt'), 'wb').and_yield(double('file', write: true))
      download_active_storage_file(file)
    end

    it 'returns the local path of the downloaded file' do
      allow(File).to receive(:open).and_yield(double('file', write: true))
      expect(download_active_storage_file(file)).to eq(Rails.root.join('tmp', 'example.txt').to_s)
    end

    it 'raises an error if the file cannot be downloaded' do
      allow(file).to receive(:download).and_raise(RuntimeError, 'Error message')
      expect { download_active_storage_file(file) }.to raise_error(RuntimeError, 'Error message')
    end

    it 'raises an error if the file cannot be saved to the local path' do
      allow(File).to receive(:open).and_raise(RuntimeError, 'Error message')
      expect { download_active_storage_file(file) }.to raise_error(RuntimeError, 'Error message')
    end
  end
end