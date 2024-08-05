# spec/serializers/missing_person_serializer_spec.rb

require 'rails_helper'

RSpec.describe MissingPersonSerializer, type: :serializer do
  let(:missing_person) do
    MissingPerson.new(
      id: 1,
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      ethnicity: 'Caucasian',
      matched: false,
      date_birth: Date.new(1993, 1, 15),
      matched_user_id: nil
    )
  end

  subject { described_class.new(missing_person) }

  describe 'serialized attributes' do
    it 'includes the expected attributes' do
      serialized_data = subject.serializable_hash

      expect(serialized_data[:id]).to eq(missing_person.id)
      expect(serialized_data[:name]).to eq(missing_person.name)
      expect(serialized_data[:age]).to eq(missing_person.age)
      expect(serialized_data[:gender]).to eq(missing_person.gender)
      expect(serialized_data[:ethnicity]).to eq(missing_person.ethnicity)
      expect(serialized_data[:matched]).to eq(missing_person.matched)
      expect(serialized_data[:date_birth]).to eq('15-01-1993')
      expect(serialized_data[:matched_user_id]).to eq(missing_person.matched_user_id)
    end
  end
end
