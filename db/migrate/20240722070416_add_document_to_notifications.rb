class AddDocumentToNotifications < ActiveRecord::Migration[7.1]
  def change
    add_reference :notifications, :document, null: false, foreign_key: true
  end
end
