class Document < ApplicationRecord
    belongs_to :user
    has_one_attached :file
    has_many :notifications, as: :notifiable
end
