include CompFace
include ImageHelper
class AuthenticationController < ApplicationController
  # Attach photo to user(POST) - /authentication/upload
  def upload
    @photo = params[:photo]
    unless @photo.blank?
      begin
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "User does not exist" }, status: :unprocessable_entity and return
      end
      begin
        @user.photo.attach(@photo)
      rescue => e
        render json: { message: "Failed to upload photo: #{e.message}" }, status: :unprocessable_entity and return
      end
      render json: { message: "Your photo has been uploaded successfully for #{@user.name}"}, status: :ok
    else
      render json: { message: "There was no photo uploaded. Please try again later"}, status: :unprocessable_entity
    end
  end

  # Verify face authentication (POST) - /authentication/verify
  def verify
    if params[:frame]
      @frame = params[:frame]
      # get the base 64 decoded bytes first
      b64_frame = extract_base64_image_data(@frame)
      b64_decoded_frame = Base64.decode64(b64_frame)
      begin
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "User does not exist" }, status: :unprocessable_entity and return
      end 
      # Gets decoded base 64 bytes
      image_data = @user.photo.download
      similarity_score = compare_faces(b64_decoded_frame , image_data)
      if similarity_score > 70
        matched = true
      else
        matched = false
      end
      render json: {matched: matched}, status: :ok
    else
      render json: { message: "There was no frames uploaded. Please try again later"}, status: :unprocessable_entity
    end
  end
end
