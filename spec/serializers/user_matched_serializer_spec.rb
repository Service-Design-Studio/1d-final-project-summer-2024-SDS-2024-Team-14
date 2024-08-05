require 'rails_helper'

RSpec.describe UserMatchedSerializer, type: :serializer do
  describe 'serialization' do
    let(:user) { 
      User.create(
        id: 1,
        name: 'John Doe',
        date_birth: Date.new(1990, 8, 5),
        gender: 'Male',
        ethnicity: 'Caucasian'
      )
    }
    let(:serializer) { UserMatchedSerializer.new(user) }
    let(:serialization) { ActiveModelSerializers::Adapter.create(serializer) }
    
    it 'serializes the user attributes correctly' do
      expected_hash = {
        id: user.id,
        name: user.name,
        age: 34, # Assuming today's date is after August 5, 2023
        gender: user.gender,
        ethnicity: user.ethnicity,
        date_birth: '05-08-1990'
      }

      expect(serialization.as_json).to eq(expected_hash)
    end
  end
end
