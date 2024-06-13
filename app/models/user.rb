class User < ApplicationRecord
    has_secure_password     #add password and password confirmation
    validates :email, presence: true
end
