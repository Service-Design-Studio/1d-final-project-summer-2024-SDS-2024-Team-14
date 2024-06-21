class VerifyController < ApplicationController
    def show 
        @user = User.find(params[:id])
        @user.verification_status = "Approved"
        if @user.save
            render json: {message: "Approval for #{@user.name} successful" },
            status: :ok
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end
end