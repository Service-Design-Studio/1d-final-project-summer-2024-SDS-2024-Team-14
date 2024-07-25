require 'rtesseract'
require 'json'
require 'pdf-reader'
require 'google/cloud/translate/v2'
require 'google/cloud/storage'


module Ocr
  def process_image(image_path)
    begin
      # Use RTesseract to do OCR on the image
      ocr = RTesseract.new(image_path)
      text = ocr.to_s.strip
      if text.empty?
        Rails.logger.debug "OCR result is empty."
        "OCR result is empty."
      else
        # Translate the text to English
        translated = translate_text(text, 'en')
        translated
      end
    rescue => e
      Rails.logger.debug "Error processing image: #{e.message}"
      "Error processing image: #{e.message}"
    end 
  end

  def process_pdf(pdf_path)
    begin
      # Extract text from PDF using pdf-reader
      reader = PDF::Reader.new(pdf_path)
      text = ''
      reader.pages.each do |page|
        text += page.text
      end

      if text.empty?
        Rails.logger.debug "OCR result is empty."
        "OCR result is empty."
      else

      # Translate the text to English
        translated_text = translate_text(text, 'en')
        translated_text
      end
    rescue => e
      Rails.logger.debug "Error processing PDF: #{e.message}"
      "Error processing PDF: #{e.message}"
    end
  end

  def translate_text(text, target_language)
    begin
      translate = Google::Cloud::Translate::V2.new(
        credentials: Rails.application.credentials.gtranskey.as_json
        )
      translation = translate.translate text, to: target_language
      translation.text
    rescue => e
      Rails.logger.debug "Error translating text: #{e.message}"
      "Error translating text: #{e.message}"
    end
  end

  def ocr(file_path)
    prompt = if file_path.downcase.end_with?('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif', '.webp')
              process_image(file_path)
            elsif file_path.downcase.end_with?('.pdf')
              process_pdf(file_path)
            else
              Rails.logger.debug "Unsupported file type"
              "Unsupported file type"
            end
    prompt
  end

  def download_active_storage_file(file)
    local_path = Rails.root.join('tmp', file.filename.to_s)
    File.open(local_path, 'wb') do |local_file|
      local_file.write(file.download)
    end
    local_path.to_s
  end
end