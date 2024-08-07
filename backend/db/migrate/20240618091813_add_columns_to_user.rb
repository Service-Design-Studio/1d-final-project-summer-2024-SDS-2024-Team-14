class AddColumnsToUser < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :ethnicity, :string
    add_column :users, :religion, :string
    add_column :users, :gender, :string
    add_column :users, :date_birth, :date
    add_column :users, :date_arrival, :date
  end
end
