class AddVerificationStatusToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :verification_status, :string
  end
end
