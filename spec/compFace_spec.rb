require 'rails_helper'
require 'aws-sdk-rekognition'
require_relative '../lib/compFace' # Make sure this path points to where your CompFace module is defined

# Mock AwsRekognitionClient
class AwsRekognitionClient
  include Singleton

  def client
    @client ||= Aws::Rekognition::Client.new
  end
end

RSpec.describe CompFace do
  describe '#compare_faces' do
    let(:face1) { 'face1_bytes' }
    let(:face2) { 'face2_bytes' }
    let(:client) { instance_double(Aws::Rekognition::Client) }
    let(:face_match) { instance_double(Aws::Rekognition::Types::CompareFacesMatch, similarity: 95.0) }
    let(:response) { instance_double(Aws::Rekognition::Types::CompareFacesResponse, face_matches: [face_match]) }

    before do
      allow(AwsRekognitionClient.instance).to receive(:client).and_return(client)
    end

    context 'when faces match with similarity' do
      it 'returns the similarity percentage' do
        allow(client).to receive(:compare_faces).and_return(response)

        expect(subject.compare_faces(face1, face2)).to eq(95.0)
      end
    end

    context 'when faces do not match' do
      let(:response) { instance_double(Aws::Rekognition::Types::CompareFacesResponse, face_matches: []) }

      it 'returns nil' do
        allow(client).to receive(:compare_faces).and_return(response)

        expect(subject.compare_faces(face1, face2)).to be_nil
      end
    end
  end
end
