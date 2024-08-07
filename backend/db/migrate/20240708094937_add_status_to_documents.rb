class AddStatusToDocuments < ActiveRecord::Migration[7.1]
  def change
    add_column :documents, :status, :string
  end
end
