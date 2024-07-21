class NotificationService
  def self.create_document_upload_success_notification(user, document)
    Notification.create(
      user: user,
      document: document,
      category: "upload success",
      content: "Your #{document.category} document: #{document.title.length > 20 ? document.title[0..17] + document.title[18..-1].gsub(/...$/, '...') : document.title} has been uploaded successfully.",
      read: false
    )
  end
  def self.create_document_upload_fail_notification(user, document)
    Notification.create(
      user: user,
      document: document,
      category: "upload fail",
      content: "Your #{document.category} document: #{document.title.length > 20 ? document.title[0..17] + document.title[18..-1].gsub(/...$/, '...') : document.title} has failed to upload. Please try again.",
      read: false
    )
  end
  def self.welcome_notification(user)
    Notification.create(
      user: user,
      category: "create account",
      content: "Welcome to Enable ID, #{user.name}. Use the chatbot to learn more.",
      read: false
    )
  end
  def self.pending_user_notification(user)
    Notification.create(
      user: user,
      category: "approval pending",
      content: "Your refugee status is pending approval.",
      read: false
    )
  end
  def self.verified_user_notification(user)
    Notification.create(
      user: user,
      category: "approval success",
      content: "Your refugee status has been approved.",
      read: false
    )
  end
end