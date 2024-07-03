class VerifyController < ApplicationController
    def show 
        begin
            @user = User.find(params[:id])
            @user.verification_status = "Approved"
            render json: {message: "Approval for #{@user.name} successful" },
            status: :ok
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
    end
end