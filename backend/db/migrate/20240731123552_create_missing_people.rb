class CreateMissingPeople < ActiveRecord::Migration[7.1]
  def change
    create_table :missing_people do |t|
      t.string :name
      t.integer :age
      t.string :gender
      t.string :ethnicity
      t.boolean :matched
      t.date :date_birth

      t.timestamps
    end
  end
end
