# class MatchController < ApplicationController
#   # associate the match (POST) - /match
#   def create
#     # id of missing person
#     @missing = params[:missing] 
#     @user_id = params[:user_id]
#     begin
#       @missing = MissingPerson.find_by(id: params[:missing])
#     rescue ActiveRecord::RecordNotFound
#         render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
#     end
#     if @missing.matched
#       render json: { message: "#{@missing.name} has already been matched with you."}, status: :unprocessable_entity and return
#     else
#       @missing.matched = true
#       @missing.matched_user_id = @user_id
#     end
#     if @missing.save
#       render json: { message: "You have successfully matched with #{@missing.name}."} and return
#     else
#       render json: { message: "There was an issue matching the user. Please try again later."}, status: :unprocessable_entity and return
#     end
#   end


#   # return matched users (GET) - /match/[id]
#   def show
#     # TODO - do a check if they have been matched, if matched already just return the matched user's info
#     begin
#       @missing = MissingPerson.find_by(id: params[:id])
#     rescue ActiveRecord::RecordNotFound
#         render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
#     end
#     match_json = User.find_matches(@missing.name, @missing.ethnicity, @missing.age, @missing.gender, @missing.date_birth, @missing.photo.attached? ? @missing.photo.download : nil)
#     unless match_json.nil? 
#       render json: match_json, status: :ok and return
#     else
#       render json: { message: "No similar matches were found for this person"}, status: :ok and return
#     end
#   end

#   # return associated user details (GET) - /match/associated/[id]
#   def associated
#     begin
#       @missing = MissingPerson.find_by(id: params[:id])
#     rescue ActiveRecord::RecordNotFound
#       render json: { message: "Missing person does not exist" }, status: :unprocessable_entity and return
#     end
#     if @missing.matched_user
#       render json: @missing.matched_user, status: :ok and return
#     else
#       render json: { message: "No users are associated with this missing person"}, status: :ok and return
#     end
#   end
# end

class MatchController < ApplicationController
  # associate the match (POST) - /match
  def create
    # id of missing person
    @missing = MissingPerson.find_by(id: params[:missing])

    if @missing.nil?
      render json: { message: "Missing person does not exist" }, status: :unprocessable_entity
      return
    end

    if @missing.matched
      render json: { message: "#{@missing.name} has already been matched with you." }, status: :unprocessable_entity
      return
    else
      @missing.matched = true
      @missing.matched_user_id = params[:user_id]
    end

    if @missing.save
      render json: { message: "You have successfully matched with #{@missing.name}." }
    else
      render json: { message: "There was an issue matching the user. Please try again later." }, status: :unprocessable_entity
    end
  end

  # return matched users (GET) - /match/[id]
  def show
    @missing = MissingPerson.find_by(id: params[:id])

    if @missing.nil?
      render json: { message: "Missing person does not exist" }, status: :unprocessable_entity
      return
    end

    match_json = User.find_matches(@missing.name, @missing.ethnicity, @missing.age, @missing.gender, @missing.date_birth, @missing.photo.attached? ? @missing.photo.download : nil)

    unless match_json.nil?
      render json: match_json, status: :ok
    else
      render json: { message: "No similar matches were found for this person" }, status: :ok
    end
  end

  # return associated user details (GET) - /match/associated/[id]
  def associated
    @missing = MissingPerson.find_by(id: params[:id])

    if @missing.nil?
      render json: { message: "Missing person does not exist" }, status: :unprocessable_entity
      return
    end

    if @missing.matched_user
      render json: @missing.matched_user, status: :ok
    else
      render json: { message: "No users are associated with this missing person" }, status: :ok
    end
  end
end