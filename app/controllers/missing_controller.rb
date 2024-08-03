class MissingController < ApplicationController
  # Create missing people (POST) - /missing
  def create
    @user = User.find(params[:user_id])
    @missing = @user.missing_people.create(missing_params)
    if @missing.save
      # TODO - notification service
      render json: {message: "The missing person #{@missing.name} has been created successfully", user_id: @user.id}, status: :created
    else
        render json: @user.errors, status: :unprocessable_entity
    end
  end

  # Attach photo to missing person(POST) - /missing/upload
  def upload
    @photo = params[:photo]
    unless @photo.blank?
      begin
        @missing = MissingPerson.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "User does not exist" }, status: :unprocessable_entity and return
      end
      begin
        missing.photo.attach(@photo)
      rescue => e
        render json: { message: "Failed to upload photo: #{e.message}" }, status: :unprocessable_entity and return
      end
      render json: { message: "Your photo has been uploaded successfully for #{@missing.name}"}, status: :ok
    else
      render json: { message: "There was no photo uploaded. Please try again later"}, status: :unprocessable_entity
    end
  end

  # Return missing people based on id(GET) - /missing/[id]
  def show 
    begin
      @user = User.find(params[:id])
      render json: @user.missing_people, status: :ok
    rescue ActiveRecord::RecordNotFound
        render json: { message: "No missing people found" }, status: :unprocessable_entity
    end
  end


  def missing_params
    params.permit(:name, :age, :gender, :ethnicity, :date_birth)
  end

end
