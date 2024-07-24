class Notification < ApplicationRecord
  belongs_to :user
  validates :category, presence: true
  validates :content, presence: true
end
