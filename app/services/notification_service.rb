class NotificationService
  def self.create_document_upload_success_notification(user_id,document)
    puts "Creating success notification for document #{document.id}"

    notification = Notification.create(
      user_id: user_id,
      category: "upload success",
      content: "Your #{document.category} document: #{document.name.length > 20 ? document.name[0..17] + document.name[18..-1].gsub(/...$/, '...') : document.name} has been uploaded successfully.",
      read: false
    )
    puts "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.create_document_upload_fail_notification(user_id, document)
    puts "Creating fail notification for document #{document.id}"
    notification = Notification.create(
      user_id: user_id,
      category: "upload fail",
      content: "Your #{document.category} document: #{document.name.length > 20 ? document.name[0..17] + document.name[18..-1].gsub(/...$/, '...') : document.name} has failed to upload. Please try again.",
      read: false
    )
    puts "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.welcome_notification(user_id, user_name)
    puts "Creating welcome notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "create account",
      content: "Welcome to Enable ID, #{user_name}. Use the chatbot to learn more.",
      read: false
    )
    puts "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.pending_user_notification(user_id)
    puts "Creating pending notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "approval pending",
      content: "Your refugee status is pending approval.",
      read: false
    )
    puts "Notification created: #{notification.id}" if notification.persisted?
  end

  def self.verified_user_notification(user_id)
    puts "Creating verified notification for user #{user_id}"
    notification = Notification.create(
      user_id: user_id,
      category: "approval success",
      content: "Your refugee status has been approved.",
      read: false
    )
    puts "Notification created: #{notification.id}" if notification.persisted?
  end
end