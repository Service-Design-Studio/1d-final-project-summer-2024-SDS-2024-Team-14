include CompFace

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
      render json: { message: "Your photo has been uploaded successfully for #{@missing.name}"}, status: :ok
    else
      render json: { message: "There was no photo uploaded. Please try again later"}, status: :unprocessable_entity
    end
  end

  # Verify face authentication (POST) - /authentication/verify
  def verify
    if params[:frame]
      @frame = params[:frame]
      begin
        @user = User.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "User does not exist" }, status: :unprocessable_entity and return
      end 
      # TODO - I need to convert to path so that it can read into bytes
      similarity_score = compare_faces(@frame , @user.photo)
      if similarity_score > 70:
        matched = True
      else:
        matched = False
      end
      render json: {matched: matched}, status: :ok
    else
      render json: { message: "There was no frames uploaded. Please try again later"}, status: :unprocessable_entity
    end
end
