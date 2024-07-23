class NotificationService
  def self.create_document_upload_success_notification(user_id, document, doc_category)
    Rails.logger.info "Creating success notification for Document #{document.id}"

    notification = Notification.create(
      user_id: user_id,
      category: "Upload Success",
      content: "Your #{doc_category.capitalize} document: #{document.name.length > 20 ? document.name[0..17] + document.name[18..-1].gsub(/...$/, '...') : document.name} has been uploaded successfully.",
      read: false
    )
    Rails.logger.info "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.create_document_upload_fail_notification(user_id, document, doc_category)
    Rails.logger.info "Creating fail notification for document #{document.id}"
    notification = Notification.create(
      user_id: user_id,
      category: "Upload Fail",
      content: "Your #{doc_category.capitalize} document: #{document.name.length > 20 ? document.name[0..17] + document.name[18..-1].gsub(/...$/, '...') : document.name} has failed to upload. Please try again.",
      read: false
    )
    Rails.logger.info "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.welcome_notification(user_id, user_name)
    Rails.logger.info "Creating welcome notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "Create Account",
      content: "Welcome to Enable ID, #{user_name}. Use the chatbot to learn more.",
      read: false
    )
    Rails.logger.info "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.pending_user_notification(user_id)
    Rails.logger.info "Creating pending notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "Approval Pending",
      content: "Your refugee status is pending approval.",
      read: false
    )
    Rails.logger.info "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.verified_user_notification(user_id)
    Rails.logger.info "Creating verified notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "Approval Success",
      content: "Your refugee status has been approved.",
      read: false
    )
    Rails.logger.info "Notification created: #{notification.id}" if notification.persisted?
  end
end