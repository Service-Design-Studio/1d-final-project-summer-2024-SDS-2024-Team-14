require 'aws-sdk-rekognition'

module CompFace
  def compare_faces(face1 , face2)
    # Need to convert to bytes first for api call
    face1_bytes = File.read(face1)
    face2_bytes = File.read(face2)

    # Get singleton instance of AwsRekognition
    client = AwsRekognitionClient.instance.client

    resp = client.compare_faces({
      source_image: { bytes: source_image_bytes },
      target_image: { bytes: target_image_bytes },
      similarity_threshold: 50
    })
    # if match
    if resp.face_matches.any?
      # I'll return the similarity %
      resp.face_matches.first.similarity
    else
      # return nil for condition check
      nil
    end
  end
end
    