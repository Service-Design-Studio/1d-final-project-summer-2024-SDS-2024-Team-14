# spec/helpers/image_helper_spec.rb
require 'rails_helper'

RSpec.describe ImageHelper do
  include ImageHelper

  describe '#extract_base64_image_data' do
    context 'when given a valid Base64 image data URI' do
      it 'extracts and returns the Base64 image data' do
        data_uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
        base64_data = 'iVBORw0KGgoAAAANSUhEUgAA...'
        
        expect(extract_base64_image_data(data_uri)).to eq(base64_data)
      end
    end

    context 'when given an invalid Base64 image data URI' do
      it 'raises an Invalid Base64 image string error' do
        invalid_data_uri = 'invalid_data_uri'
        
        expect { extract_base64_image_data(invalid_data_uri) }.to raise_error("Invalid Base64 image string")
      end
    end
  end
end
