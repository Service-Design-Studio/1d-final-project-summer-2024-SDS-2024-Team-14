class AddMatchedUserIdToMissingPeople < ActiveRecord::Migration[7.1]
  def change
    add_column :missing_people, :matched_user_id, :integer
  end
end
