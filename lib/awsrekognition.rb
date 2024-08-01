require 'aws-sdk-rekognition'
require 'singleton'

class AwsRekognitionClient
  include Singleton

  def initialize
    @client = Aws::Rekognition::Client.new(
      region: 'ap-southeast-1',
      credentials: Aws::Credentials.new(
        Rails.application.credentials.rekognition_access,
        Rails.application.credentials.rekognition_secret
      )
    )
  end

  def client
    @client
  end
end