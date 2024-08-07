class AddImportantToDocuments < ActiveRecord::Migration[7.1]
  def change
    add_column :documents, :important, :string
  end
end
