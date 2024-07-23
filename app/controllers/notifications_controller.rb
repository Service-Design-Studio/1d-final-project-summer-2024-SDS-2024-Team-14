class NotificationsController < ApplicationController
  # before_action :authenticate_user!
  def index 
    puts "All Notification records:", Notification.all
    render json: Notification.all, status: :ok
  end

  def show
    user = params[:id]
    begin
      @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
      render json: {message: "User does not exist"}, status: :unprocessable_entity
    end
    @notifications = Notification.where("user_id": user)
    render json: @notifications, status: :ok
  end

  def mark_all_as_read
    user = params[:user_id]
    id = params[:id]
    begin
      @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
      render json: {message: "User does not exist"}, status: :unprocessable_entity
    end
    Notification.where("user_id": user, "id": id).update_all("read": true)
    render json: {success: true}
  end
end
