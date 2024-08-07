class ChangeVerificationstatusInUsers < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :verification_status, 'Pending approval'
  end
end
