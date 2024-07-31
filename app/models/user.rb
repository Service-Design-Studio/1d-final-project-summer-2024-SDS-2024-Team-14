class User < ApplicationRecord
    has_secure_password     #add password and password confirmation
    validates :email, presence: true, uniqueness: true
    has_many :documents, dependent: :destroy
    has_many :notifications, dependent: :destroy
    has_one_attached :photo, dependent: :destroy
    has_many :missing_person, dependent: :destroy
    has_many :matched_missing_people, class_name: 'MissingPerson', foreign_key: 'matched_user_id'

    # Fuzzy matching for names
    def self.name_match(input_name)
        users = User.all
        matcher = FuzzyMatch.new(users, read: :name)
        matcher.find(input_name)
    end

    # Simple categorical match for ethnicity
    def self.ethnicity_match(input_ethnicity)
        User.where(ethnicity: input_ethnicity)
    end

    # Age match within a range of ±2 years
    def self.age_match(input_age)
        User.where(age: (input_age - 2)..(input_age + 2))
    end

    # Simple categorical match for gender
    def self.gender_match(input_gender)
        User.where(gender: input_gender)
    end

    # Combined matching logic
    def self.find_matches(input_name, input_ethnicity, input_age, input_gender)
        name_matches = name_match(input_name)
        ethnicity_matches = ethnicity_match(input_ethnicity)
        age_matches = age_match(input_age)
        gender_matches = gender_match(input_gender)

        # Find intersection of all matched sets
        matches = name_matches & ethnicity_matches & age_matches & gender_matches
        matches.count
    end
end
