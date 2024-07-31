class MissingController < ApplicationController
  # Create missing people (POST)
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

  # Attach photo to missing person(POST) 

  # Return missing people based on id(GET)
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
