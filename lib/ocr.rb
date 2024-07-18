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
        puts "OCR result is empty."
        nil
      else
        # Translate the text to English
        puts text
        translated = translate_text(text, 'en')
        puts translated

        translated
      end
    rescue => e
      puts "Error processing image: #{e.message}"
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
        puts "OCR result is empty."
        nil
      else

      # Translate the text to English
        translated_text = translate_text(text, 'en')

        translated_text
      end
    rescue => e
      "Error processing PDF: #{e.message}"
    end
  end

  def translate_text(text, target_language)
    begin
      translate = Google::Cloud::Translate::V2.new(
        credentials: "C:/Users/USER/sds-ocr-428616-97b95f2f702a.json"
      )
      translation = translate.translate text, to: target_language
      translated_text = translation[:translations].map{|transl| transl[:translated_text]}
      translated_text
    rescue => e
      "Error translating text: #{e.message}"
    end
  end

  def ocr(file_path)
    prompt = if file_path.downcase.end_with?('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif', '.webp')
              process_image(file_path)
            elsif file_path.downcase.end_with?('.pdf')
              process_pdf(file_path)
            else
<<<<<<< HEAD
              "Unsupported file type"
=======
              puts "Unsupported file type"
              nil
>>>>>>> da5dfbae76ca209b16aef69cfe91234907e488ae
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