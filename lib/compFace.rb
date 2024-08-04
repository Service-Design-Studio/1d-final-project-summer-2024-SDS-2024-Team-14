module CompFace
  def compare_faces(face1 , face2)

    # Get singleton instance of AwsRekognition
    client = AwsRekognitionClient.instance.client
    Rails.logger.debug face1
    Rails.logger.debug face2 

    resp = client.compare_faces({
      source_image: { bytes: face1 },
      target_image: { bytes: face2 },
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
    