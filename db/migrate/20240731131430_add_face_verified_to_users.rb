class AddFaceVerifiedToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :face_verified, :boolean
  end
end
