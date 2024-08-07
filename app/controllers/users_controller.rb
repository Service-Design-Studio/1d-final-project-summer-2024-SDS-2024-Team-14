require_dependency 'user_serializer'

class UsersController < ApplicationController
    # Get all users(GET) - /users
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    # Get users based on ID(GET) - /users/[id]
    def show
        begin
            @user = User.find(params[:id])
            render json: @user, status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
    end

    # Create/signup user(POST) - /users
    def create
        @user = User.new(user_params)  # Use `new` instead of `create` here
        if @user.save
          NotificationService.pending_user_notification(@user.id)
          NotificationService.welcome_notification(@user.id, @user.name)
          render json: {message: "Signup for user #{@user.name} successful", user_id: @user.id}, status: :created
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

    # To ensure only these params are sent and required in create acc
    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :country, :religion, :ethnicity, :gender, :date_birth, :date_arrival)
    end
    
end
