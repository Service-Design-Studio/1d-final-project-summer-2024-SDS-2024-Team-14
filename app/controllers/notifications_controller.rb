class NotificationsController < ApplicationController
  # get all Notifications(GET) - /notifications
  def index 
    render json: Notification.all, status: :ok
  end

  # get all Notifications(GET) - /notifications/[id]
  def show
    user = params[:id]
    begin
      @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
      render json: {message: "User does not exist"}, status: :unprocessable_entity and return
    end
    @notifications = Notification.where("user_id": user)
    render json: @notifications, status: :ok
  end

  # Mark all notifications as read(POST) - /notifications/read
  def mark_all_as_read
    user = params[:user_id]
    id = params[:id]
    begin
      @user = User.find(user)
    rescue ActiveRecord::RecordNotFound
      render json: {message: "User does not exist"}, status: :unprocessable_entity and return
    end
    Notification.where("user_id": user, "id": id).update_all("read": true)
    render json: {success: true}
  end
end
