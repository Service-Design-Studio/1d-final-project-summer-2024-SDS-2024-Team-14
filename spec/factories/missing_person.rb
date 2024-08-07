FactoryBot.define do
    factory :missing_person do
      name { "John Doe" }
      age { 30 }
      gender { "Male" }
      ethnicity { "Caucasian" }
      date_birth { Date.new(1993, 1, 15) }
      # Add any other fields that are required by your model
    end
  end