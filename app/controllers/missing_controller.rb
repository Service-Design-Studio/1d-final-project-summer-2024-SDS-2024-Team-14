class MissingController < ApplicationController
  # Create missing people (POST) - /missing
  def create
    @user = User.find(params[:user_id])
    @missing = @user.missing_people.create(missing_params)
    if @missing.save
      # TODO - notification service
      render json: {message: "The missing person #{@missing.name} has been created successfully", user_id: @user.id, missing_id: @missing.id}, status: :created 
    else
        render json: @user.errors, status: :unprocessable_entity 
    end
  end

  def destroy
    begin
      @missing = MissingPerson.find(params[:id])
      if @missing.destroy
        render json: {message: "The missing person entry has been deleted successfully"}, status: :ok and return
      else
        render json: {message: "Failed to delete missing person entry"}, status: :ok and return
      end
    rescue ActiveRecord::RecordNotFound
    end
    
  end
def update
  begin
    @missing = MissingPerson.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
  end
  if @missing.update(missing_params)
    render json: { message: "Missing person updated successfully"}, status: :ok and return
  else
    render json: { message: "Failed to update missing person", errors: @missing.errors.full_messages }, status: :unprocessable_entity and return
  end
end
  # Attach photo to missing person(POST) - /missing/upload
  def upload
    @photo = params[:photo]

      begin
        @missing = MissingPerson.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
      end
    unless @photo.blank?
      begin
        @missing.photo.attach(@photo)
      rescue => e
        render json: { message: "Failed to upload photo: #{e.message}" }, status: :unprocessable_entity 
      end
      render json: { message: "Your photo has been uploaded successfully for #{@missing.name}"}, status: :ok and return
    else
      if @missing.photo.attached?
        @missing.photo.purge
        render json: { message: "Your attached photo has been removed successfully for #{@missing.name}"}, status: :ok and return
      else
        render json: { message: "There was no photo uploaded. Please try again later."}, status: :unprocessable_entity and return
      end
    end
  end

  # Return missing people based on id(GET) - /missing/[id]
  def show 
    begin
      @user = User.find(params[:id])
      render json: @user.missing_people, status: :ok
    rescue ActiveRecord::RecordNotFound
      render json: { message: "No missing people found" }, status: :unprocessable_entity and return
    end
  end

  def missing_params
    params.permit(:name, :age, :gender, :ethnicity, :date_birth)
  end

end
