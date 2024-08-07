require 'net/http'
require 'uri'
require 'base64'
module ImageHelper
  def extract_base64_image_data(data_uri)
    # Use a regex to extract the Base64 part of the string
    if data_uri =~ /^data:image\/(png|jpeg|jpg|gif);base64,(.*)$/i
      base64_data = $2
      return base64_data
    else
      raise "Invalid Base64 image string"
    end
  end
end

