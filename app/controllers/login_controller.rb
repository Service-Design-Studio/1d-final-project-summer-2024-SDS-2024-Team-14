class LoginController < ApplicationController
    #login --> /login
    def create
        @user = User.find_by(email: params[:email])
        if !@user
            render json: {message: "Login failed. The email you have entered is invalid. Please enter a valid email." }, status: :unprocessable_entity
        elsif !!@user & @user.authenticate(params[:password])
            render json: {message: "Login for #{@user.name} successful", user_id: @user.id }, status: :ok
        else
            render json: {message: "Login failed. Please make sure that your password is correct." }, status: :unprocessable_entity
        end
    end
end