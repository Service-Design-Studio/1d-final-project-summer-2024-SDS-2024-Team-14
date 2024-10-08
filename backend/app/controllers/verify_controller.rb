class VerifyController < ApplicationController
    # Verify refugee status(GET) - /verify/[id] 
    def show 
        begin
            @user = User.find(params[:id])
            if @user.verification_status == "Approved"
                render json: {message: "#{@user.name} has already been verified" }, status: :unprocessable_entity
            else
                @user.verification_status = "Approved"
                if @user.save
                    NotificationService.verified_user_notification(@user.id)
                    render json: {message: "Approval for #{@user.name} successful" }, status: :ok
                end
            end
        rescue ActiveRecord::RecordNotFound
            render json: { message: "User does not exist" }, status: :unprocessable_entity
        end
    end
end