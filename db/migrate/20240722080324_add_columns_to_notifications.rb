class AddColumnsToNotifications < ActiveRecord::Migration[7.1]
  def change
    add_column :notifications, :content, :string
    add_column :notifications, :read, :boolean
  end
end
