FactoryBot.define do
    factory :notification do
    #   title { "New Notification" }
      content { "You have a new notification." }
      category { "education" }
      user # This associates the notification with a user factory instance
  
      # If your notification model includes more fields, define them here,
      # e.g., status, read_at, etc.
    end
  end