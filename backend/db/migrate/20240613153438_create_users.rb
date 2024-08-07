class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.text :email
      t.text :password_digest
      t.text :name
      t.text :country
      t.timestamps
    end
  end
end
