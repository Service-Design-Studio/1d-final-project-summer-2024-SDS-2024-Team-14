class MissingController < ApplicationController
  # Create missing people (POST) - /missing
  # def create
  #   @user = User.find(params[:user_id])
  #   @missing = @user.missing_people.build(missing_params)
  #   if @missing.save
  #     # TODO - notification service
  #     render json: {message: "The missing person #{@missing.name} has been created successfully", user_id: @user.id, missing_id: @missing.id}, status: :created 
  #   else
  #       render json: @missing.errors, status: :unprocessable_entity 
  #   end
  # end
  def create
    @user = User.find_by(id: params[:user_id])
    @missing = @user.missing_people.create(missing_params)
    
    if @missing.save
      render json: { message: "The missing person #{@missing.name} has been created successfully", user_id: @user.id, missing_id: @missing.id }, status: :created 
    else
      render json: @missing.errors, status: :unprocessable_entity
    end
  end

  def destroy
    begin
      @missing = MissingPerson.find_by(id: params[:id])
      if @missing
        @missing.destroy
        render json: {message: "The missing person entry has been deleted successfully"}, status: :ok
      else
        render json: {message: "Failed to delete missing person entry"}, status: :unprocessable_entity 
      end
    rescue ActiveRecord::RecordNotFound 
    end
    
  end
# def update
#   begin
#     @missing = MissingPerson.find_by(id: params[:id])
#   rescue ActiveRecord::RecordNotFound
#     render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
#   end
#   if @missing.update(missing_params)                                              
#     render json: { message: "Missing person updated successfully"}, status: :ok 
#   else
#     render json: { message: "Failed to update missing person", errors: @missing.errors.full_messages }, status: :unprocessable_entity 
#   end
# end
def update
  @missing = MissingPerson.find_by(id: params[:id]) 
  if @missing.nil?
    render json: { message: "Missing person does not exist" }, status: :unprocessable_entity
    return
  end
  
  if @missing.update(missing_params)
    render json: { message: "Missing person updated successfully" }, status: :ok 
  else
    render json: { errors: @missing.errors.full_messages }, status: :unprocessable_entity 
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
      render json: { message: "Your photo has been uploaded successfully for #{@missing.name}"}, status: :ok
    else
      if @missing.photo.attached?
        @missing.photo.purge
        render json: { message: "Your attached photo has been removed successfully for #{@missing.name}"}, status: :ok 
      else
        render json: { message: "There was no photo uploaded. Please try again later."}, status: :unprocessable_entity 
      end
    end
  end

  def photo
    begin
      @missing = MissingPerson.find(params[:id])
      if @missing.photo.attached?
        render json: { photo_url: url_for(@missing.photo) }, status: :ok
      else
        render json: {photo_url: "" }, status: :ok
      end
    rescue ActiveRecord::RecordNotFound
      render json: { message: "No missing people found" }, status: :unprocessable_entity and return
    end
  end

  # Return missing people based on id(GET) - /missing/[id]
  def show 
    begin
      @user = User.find_by(id: params[:id])
  #     render json: @user.missing_people, status: :ok
  #   rescue ActiveRecord::RecordNotFound
  #     render json: { message: "No missing people found" }, status: :unprocessable_entity and return
  #   end
  # end
  if @user.nil? || @user.missing_people.empty?
    return render json: { message: "No missing people found" }, status: :unprocessable_entity
  end

  render json: @user.missing_people, status: :ok
end
end

  def missing_params
    params.permit(:name, :age, :gender, :ethnicity, :date_birth)
  end

end
