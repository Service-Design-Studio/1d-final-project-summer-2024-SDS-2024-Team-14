class AddUserToMissingPeople < ActiveRecord::Migration[7.1]
  def change
    add_reference :missing_people, :user, null: false, foreign_key: true
  end
end
