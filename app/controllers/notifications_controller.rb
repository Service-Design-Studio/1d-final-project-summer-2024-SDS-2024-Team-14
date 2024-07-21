class NotificationsController < ApplicationController
  # before_action :authenticate_user!
  def retrieve
    user = params[:id]
    begin
      @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
      render json: {message: "User does not exist"}, status: :unprocessable_entity
    end
    @notifications = @user.notifications.order(created_at: :desc)
  end

  def mark_all_as_read
    @user.notifications.update_all(read: true)
    render json: {success: true}
  end
end
