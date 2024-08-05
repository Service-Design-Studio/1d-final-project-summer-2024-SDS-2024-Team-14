require "rails_helper"

RSpec.describe "Users", type: :model do

  let!(:user1) do
    User.create(
      email: 'test1@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser1",
      country: "Myanmar",
      ethnicity: 'Bantu',
      religion: "Buddhist",
      gender: "Female",
      date_birth: Date.new(2001, 6, 10), # Ensure the date is a Date object
      date_arrival: Date.new(2024, 6, 10),
      verification_status: "Pending approval",
      id: 1
    )
  end

  let!(:user2) do
    User.create(
      email: 'test2@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: 'testUser2',
      country: 'Panana',
      ethnicity: 'Arab',
      religion: "Muslim",
      gender: "Male",
      date_birth: Date.new(2004, 6, 10),
      date_arrival: Date.new(2024, 6, 14),
      verification_status: "Approved",
      id: 2
    )
  end

  let!(:user3) do
    User.create(
      email: 'test3@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser3",
      country: "Myanmar",
      ethnicity: 'Bantu', # Ensure this matches the test case
      religion: "Buddhist",
      gender: "Female",
      date_birth: Date.new(2001, 6, 10),
      date_arrival: Date.new(2024, 6, 10),
      verification_status: "Pending approval",
      id: 3
    )
  end

  describe '.name_match' do
    it 'returns users with similar names' do
      expect(User.name_match('testUser1')).to include(user1)
      expect(User.name_match('testUser3')).not_to include(user2)
    end
  end

  describe '.ethnicity_match' do
    it 'returns users with the same ethnicity' do
      expect(User.ethnicity_match('Bantu')).to include(user1, user3) # Ensure ethnicity matches
      expect(User.ethnicity_match('Bantu')).not_to include(user2)
    end
  end

  describe '.age_match' do
    it 'returns users within ±2 years of the input age' do
      expect(User.age_match(23)).to include(user1, user3) # Adjust the age to 23
      expect(User.age_match(23)).not_to include(user2)
    end
  end

  describe '.gender_match' do
    it 'returns users with the same gender' do
      expect(User.gender_match('Female')).to include(user1, user3)
      expect(User.gender_match('Female')).not_to include(user2)
    end
  end

  describe '.date_birth_match' do
    it 'returns users with the same date of birth' do
      expect(User.date_birth_match(user1.date_birth)).to include(user1, user3) # User1 and User3 have the same DOB
      expect(User.date_birth_match(user1.date_birth)).not_to include(user2)
    end
  end

  describe '.find_matches' do
    before do
      allow_any_instance_of(CompFace).to receive(:compare_faces).and_return(80)
    end

    let(:input_name) { 'testUser1' }
    let(:input_ethnicity) { 'Bantu' } # Match the test data
    let(:input_age) { 23 } # Ensure age is correct
    let(:input_gender) { 'Female' }
    let(:input_date) { user1.date_birth }
    let(:input_photo) { nil } # You may need to mock or skip actual photo handling

    context 'without input photo' do
      it 'calculates the match percentage based on attributes' do
        matches = User.find_matches(input_name, input_ethnicity, input_age, input_gender, input_date, nil)
        expect(matches).to include(a_hash_including(user: hash_including(id: user1.id)))
        expect(matches).to include(a_hash_including(user: hash_including(id: user3.id)))
      end
    end

    context 'with input photo' do
      it 'calculates the match percentage based on attributes and photo similarity' do
        photo_path = Rails.root.join('spec', 'fixtures', 'photo.png')

        File.open(photo_path) do |file|
        user1.photo.attach(io: file, filename: File.basename(photo_path), content_type: 'image/png')
        end

        input_photo = user1.photo.download

        matches = User.find_matches(input_name, input_ethnicity, input_age, input_gender, input_date, input_photo)
        expect(matches).to include(a_hash_including(user: hash_including(id: user1.id)))
        expect(matches).to include(a_hash_including(user: hash_including(id: user3.id)))
      end
    end
  end
end
