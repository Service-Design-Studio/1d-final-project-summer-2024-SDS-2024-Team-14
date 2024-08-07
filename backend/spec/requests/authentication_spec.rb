# require 'rails_helper'

# RSpec.describe AuthenticationController, type: :controller do
#   let(:user) { User.create(
#             id: 1,
#             email: 'test1@gmail.com',
#             password: 'test123',
#             password_confirmation: 'test123',
#             "name": "testUser1",
#             "country": "Myanmar",
#             ethnicity: 'Bantu',
#             "religion": "Buddhist",
#             "gender": "Female",
#             "date_birth": "10-06-2001",
#             "date_arrival": "10-06-2024",
#             "verification_status": "Pending approval"
#             ) }
#   let(:valid_photo) { fixture_file_upload('spec/fixtures/photo.png', 'image/jpg') }
#   let(:invalid_photo) { nil }
#   let(:frame_data) { Base64.encode64(File.read('spec/fixtures/test_frame.jpg')) }

#   describe "POST #upload" do
#     context "when the user exists" do
#       context "with a valid photo" do
#         it "attaches the photo and returns success message" do
#           post :upload, params: { id: user.id, photo: valid_photo }
#           expect(response).to have_http_status(:ok)
#           expect(response.body).to include("Your photo has been uploaded successfully for #{user.name}")
#           expect(user.reload.photo.attached?).to be_truthy
#         end
#       end

#       context "with an invalid photo" do
#         it "returns an error message" do
#           post :upload, params: { id: user.id, photo: invalid_photo }
#           expect(response).to have_http_status(:unprocessable_entity)
#           expect(response.body).to include("There was no photo uploaded. Please try again later")
#         end
#       end
#     end

#     context "when the user does not exist" do
#       it "returns a user not found message" do
#         post :upload, params: { id: -1, photo: valid_photo }
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(response.body).to include("User does not exist")
#       end
#     end
#   end

#   describe "POST #verify" do
#     before do
#       user.photo.attach(valid_photo)
#     end

#     context "when the user exists" do
#       context "with a valid frame" do
#         it "returns a matched response" do
#           allow(controller).to receive(:compare_faces).and_return(0.9) # Mocking similarity score
          
#           post :verify, params: { id: user.id, frame: "data:image/jpeg;base64,#{frame_data}" }
#           expect(response).to have_http_status(:ok)
#           json_response = JSON.parse(response.body)
#           expect(json_response['matched']).to be true
#         end

#         it "returns a not matched response" do
#           allow(controller).to receive(:compare_faces).and_return(nil) # Mocking no match
          
#           post :verify, params: { id: user.id, frame: "data:image/jpeg;base64,#{frame_data}" }
#           expect(response).to have_http_status(:ok)
#           json_response = JSON.parse(response.body)
#           expect(json_response['matched']).to be false
#         end
#       end

#       context "without a frame" do
#         it "returns an error message" do
#           post :verify, params: { id: user.id }
#           expect(response).to have_http_status(:unprocessable_entity)
#           expect(response.body).to include("There was no frames uploaded. Please try again later")
#         end
#       end
#     end

#     context "when the user does not exist" do
#       it "returns a user not found message" do
#         post :verify, params: { id: -1, frame: "data:image/jpeg;base64,#{frame_data}" }
#         expect(response).to have_http_status(:unprocessable_entity)
#         expect(response.body).to include("User does not exist")
#       end
#     end
#   end
# end

require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do

  let(:user) { create(:user) } # Assuming you have factories set up for User

  describe "POST #upload" do
    context "when a photo is uploaded" do
      before do
        allow(User).to receive(:find).and_return(user)
      end

      it "attaches the photo to the user if the user exists" do
        file = fixture_file_upload('spec/fixtures/photo.png', 'image/jpg')
        post :upload, params: { id: user.id, photo: file }
        expect(user.photo.attached?).to be true
        expect(response).to have_http_status(:ok)
      end

      it "renders an error if the photo upload fails" do
        allow_any_instance_of(User).to receive(:photo).and_raise(StandardError, 'simulated error')
        file = fixture_file_upload('spec/fixtures/photo.png', 'image/jpg')
        post :upload, params: { id: user.id, photo: file }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Failed to upload photo: simulated error')
      end
    end

    context "when no photo is uploaded" do
      it "renders an error message" do
        post :upload, params: { id: user.id }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("There was no photo uploaded. Please try again later")
      end
    end
  end

  # describe "POST #verify" do
  #   let(:valid_frame) { "data:image/png;base64,#{Base64.encode64(File.read(Rails.root.join('spec/fixtures/photo.png')))}" }


  #   context "when a frame is uploaded" do
  #     before do
  #       allow(User).to receive(:find).and_return(user)
  #       allow(user).to receive_message_chain(:photo, :download).and_return(valid_frame)
  #       allow(CompFace).to receive(:compare_faces).and_return(0.9) # assuming a high similarity score
  #     end

  #     it "verifies the face if there is a high similarity score" do
  #       post :verify, params: { id: user.id, frame: valid_frame }
  #       expect(response).to have_http_status(:ok)
  #       expect(JSON.parse(response.body)["matched"]).to be true
  #     end

  #     it "does not verify the face if the similarity score is low" do
  #       allow(CompFace).to receive(:compare_faces).and_return(nil)
  #       allow(AuthenticationController).to receive(:verify).and_return(matched = false)
  #       post :verify, params: { id: user.id, frame: valid_frame }
  #       expect(response).to have_http_status(:ok)
  #       expect(JSON.parse(response.body)["matched"]).to be false
  #     end
  #   end

  describe "POST #verify" do
  let(:valid_frame) { "data:image/png;base64,#{Base64.encode64(File.read(Rails.root.join('spec/fixtures/photo.png')))}" }

  context "when a frame is uploaded" do
    before do
      allow(User).to receive(:find).and_return(user)
      allow(user).to receive_message_chain(:photo, :download).and_return(valid_frame)

      stub_request(:post, "https://rekognition.ap-southeast-1.amazonaws.com/")
        .with(
          body: hash_including({
            "SourceImage" => hash_including("Bytes"),
            "TargetImage" => hash_including("Bytes"),
            "SimilarityThreshold" => 70
          }),
          headers: {
            'Content-Type' => 'application/x-amz-json-1.1',
            'X-Amz-Target' => 'RekognitionService.CompareFaces'
          })
        .to_return(status: 200, body: '{"FaceMatches": [{"Similarity": 95.0}]}', headers: {})
      
      allow(CompFace).to receive(:compare_faces).and_return(0.9) # assuming a high similarity score
    end

    it "verifies the face if there is a high similarity score" do
      post :verify, params: { id: user.id, frame: valid_frame }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["matched"]).to be true
    end

    it "does not verify the face if the similarity score is low" do
      allow(CompFace).to receive(:compare_faces).and_return(nil)
      post :verify, params: { id: user.id, frame: valid_frame }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["matched"]).to be false
    end
  end

    context "when no frame is uploaded" do
      it "renders an error message" do
        post :verify, params: { id: user.id }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include("There was no frames uploaded. Please try again later")
      end
    end
  end
end