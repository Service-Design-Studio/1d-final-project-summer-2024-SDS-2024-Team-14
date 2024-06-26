class SessionsController < ApplicationController
    #login
    def create
        @user = User.find_by(email: params[:email])
        if !!@user & @user.authenticate(params[:password])
            session[:user_id] = @user.id
            render json: {message: "Login for #{@user.name} successful" }, status: :ok
        else
            render json: {message: "Login failed. Please make sure that your email and password are correct" }, status: :unprocessable_entity
        end
    end
end