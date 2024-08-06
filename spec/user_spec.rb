# spec/models/user_spec.rb

require "rails_helper"

RSpec.describe "Users", type: :model do

  before do
    # Seed data
    @user1 = User.create(
      email: 'test1@gmail.com',
      password: 'test123',
      password_confirmation: 'test123',
      name: "testUser1",
      country: "Myanmar",
      ethnicity: 'Bantu',
      religion: "Buddhist",
      gender: "Female",
      date_birth: "2001-06-10",
      date_arrival: "2024-06-10",
      verification_status: "Pending approval",
      id: 1
    )
    @user2 = User.create(
      email: 'test2@gmail.com', 
      password: 'test123', 
      password_confirmation: 'test123', 
      name: 'testUser2', 
      country: 'Panana',
      ethnicity: 'Arab',
      religion: "Muslim",
      gender: "Male",
      date_birth: "2004-06-10",
      date_arrival: "2024-06-14",
      verification_status: "Approved",
      id: 2
    )
  end

  describe 'validations' do
    it 'validates presence of email' do
      user = User.new(name: 'Test User')
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'validates uniqueness of email' do
      user = User.new(name: 'Another User', email: @user1.email)
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("has already been taken")
    end
  end
  
  describe '.name_match' do
    it 'matches users by name using fuzzy matching' do
      expect(User.name_match('testUser1')).to include(@user1)
      expect(User.name_match('test')).to include(@user1)
      expect(User.name_match('Bobby')).not_to include(@user1)
    end
  end

  describe '.ethnicity_match' do
    it 'matches users by ethnicity' do
      expect(User.ethnicity_match('Bantu')).to include(@user1)
      expect(User.ethnicity_match('Arab')).to include(@user2)
    end
  end

  describe '.age_match' do
    it 'matches users by approximate age' do
      expect(User.age_match(23)).to include(@user1) # Assuming today's year
      expect(User.age_match(20)).to include(@user2)
    end
  end

  describe '.gender_match' do
    it 'matches users by gender' do
      expect(User.gender_match('Female')).to include(@user1)
      expect(User.gender_match('Male')).to include(@user2)
    end
  end

  describe '.date_birth_match' do
    it 'matches users by exact birth date' do
      expect(User.date_birth_match(@user1.date_birth)).to include(@user1)
    end
  end

  describe '.find_matches' do
    it 'returns matched users based on different criteria' do
      result = User.find_matches('testUser1', 'Bantu', 22, 'Female', @user1.date_birth, nil)
      expect(result).to be_an(Array)
      expect(result.first[:user][:email]).to eq('test1@gmail.com')
    end

    it 'calculates percentage when matching users with photo' do
      photo = double('photo')
      allow(photo).to receive(:download).and_return('fake_image_data')

      @user1.photo.attach(io: StringIO.new('fake_image_data'), filename: 'photo.jpg')

      result = User.find_matches('testUser1', 'Bantu', 22, 'Female', @user1.date_birth, photo)
      expect(result.first[:percentage]).to be_between(0, 100)
    end
  end
end