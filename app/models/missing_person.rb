class MissingPerson < ApplicationRecord
  belongs_to :user
  has_one_attached :photo
  belongs_to :matched_user, class_name: 'User', optional: true
end
