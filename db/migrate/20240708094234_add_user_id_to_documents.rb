class AddUserIdToDocuments < ActiveRecord::Migration[7.1]
  def change
    add_column :documents, :user_id, :integer
    add_index :documents, :user_id
  end
end
