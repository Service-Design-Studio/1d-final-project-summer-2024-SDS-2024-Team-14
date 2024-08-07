module CompFace
  def compare_faces(face1 , face2)

    # Get singleton instance of AwsRekognition
    client = AwsRekognitionClient.instance.client
    begin
      resp = client.compare_faces({
        source_image: { bytes: face1 },
        target_image: { bytes: face2 },
        similarity_threshold: 70
      })
  
      # Return the similarity percentage if a match is found
      if resp.face_matches.any?
        resp.face_matches.first.similarity
      else
        nil
      end
    rescue Aws::Rekognition::Errors::InvalidParameterException => e
      nil
    end
  end
end
    