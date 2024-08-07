FactoryBot.define do
    factory :user do
      sequence(:email) { |n| "user#{n}@example.com" }
      password { 'test123' }
      password_confirmation { 'test123' }
      sequence(:name) { |n| "testUser#{n}" }
      country { 'Myanmar' }
      ethnicity { 'Bantu' }
      religion { 'Buddhist' }
      gender { 'Female' }
      date_birth { '2001-06-10' }
      date_arrival { '2024-06-10' }
      verification_status { 'Pending approval' }
    end
  end