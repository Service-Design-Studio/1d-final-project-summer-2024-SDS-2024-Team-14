require_dependency 'user_serializer'

class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    def show
        begin
            @user = User.find(params[:id])
            render json: @user, status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
    end

    def create
        @user = User.create(user_params)
        if @user.save
            NotificationService.pending_user_notification(@user.id)
            NotificationService.welcome_notification(@user.id, @user.name)
            render json: {message: "Signup for user #{@user.name} successful", user_id: @user.id}, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :country, :religion, :ethnicity, :gender, :date_birth, :date_arrival)
    end
    
end
