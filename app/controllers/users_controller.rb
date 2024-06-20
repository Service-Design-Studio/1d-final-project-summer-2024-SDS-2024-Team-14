require_dependency 'user_serializer'

class UsersController < ApplicationController
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    def show
        @user = User.find(params[:id])
        render json: @user, status: :ok
        puts "check"
    end

    def create
        @user = User.create(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :country, :religion, :ethnicity, :gender, :date_birth, :date_arrival)
    end
    
end
