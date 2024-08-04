require 'fuzzy_match'
include CompFace

class User < ApplicationRecord
    has_secure_password     #add password and password confirmation
    validates :email, presence: true, uniqueness: true
    has_many :documents, dependent: :destroy
    has_many :notifications, dependent: :destroy
    has_one_attached :photo, dependent: :destroy
    has_many :missing_people, dependent: :destroy
    has_many :matched_missing_people, class_name: 'MissingPerson', foreign_key: 'matched_user_id'

    # Fuzzy matching for names
    def self.name_match(input_name)
        users = User.all
        matcher = FuzzyMatch.new(users, read: :name)
        [matcher.find(input_name)].compact
    end

    # Simple categorical match for ethnicity
    def self.ethnicity_match(input_ethnicity)
        User.where(ethnicity: input_ethnicity).to_a
    end

    # Age match within a range of ±2 years
    def self.age_match(input_age)
        now = Time.now.utc.to_date
        min_date = (now - (input_age + 2).years).beginning_of_year
        max_date = (now - (input_age - 2).years).end_of_year
        User.where(date_birth: min_date..max_date).to_a
    end

    # Simple categorical match for gender
    def self.gender_match(input_gender)
        User.where(gender: input_gender).to_a
    end

    def self.date_birth_match(input_date)
        User.where(date_birth: input_date).to_a
      end

    # Combined matching logic
    def self.find_matches(input_name, input_ethnicity, input_age, input_gender, input_date, input_photo)
        name_matches = name_match(input_name)
        ethnicity_matches = ethnicity_match(input_ethnicity)
        age_matches = age_match(input_age)
        gender_matches = gender_match(input_gender)
        date_birth_matches = date_birth_match(input_date)
        all_matches = {
            name: name_matches,
            ethnicity: ethnicity_matches,
            age: age_matches,
            gender: gender_matches,
            date_birth: date_birth_matches
        }

        match_counts = Hash.new(0)

        # Increment match count for each user based on attribute matches
        all_matches.each do |attribute, matches|
            matches.each do |user|
                match_counts[user] += 1
            end
        end

        return nil if match_counts.empty?

        # if profile picture exists, compare face and get similarity
        if input_photo
            # Calculate similarity for each user
            similarity_scores = {}
            match_counts.each do |user, count|
                # TODO - need to convert into path to be read into bytes
              similarity_scores[user] = compare_faces(user.photo.download, input_photo)
            end
        
            # Transform match_counts to an array of hashes with user and their match count
            result = match_counts.map do |user, count|
                similarity = similarity_scores[user]
                if similarity
                    percentage = (count.to_f / 8 + (similarity.to_f / 100) * (3.0 / 8)) * 100
                else
                    percentage = (count.to_f / 8) * 100
                serialized_user = ActiveModelSerializers::SerializableResource.new(user, serializer: UserMatchedSerializer).as_json
                { user: serialized_user, percentage: percentage }
                end
            end
        else
            result = match_counts.map do |user, count|
                percentage = (count.to_f / 8) * 100
                serialized_user = ActiveModelSerializers::SerializableResource.new(user, serializer: UserMatchedSerializer).as_json
                { user: serialized_user, percentage: percentage }
            end
        end 
        result
    end
end
