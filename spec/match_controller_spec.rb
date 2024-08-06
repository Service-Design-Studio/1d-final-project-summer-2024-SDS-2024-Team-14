require 'rails_helper'

RSpec.describe MatchController, type: :controller do
    let(:user) { User.create!(
        email: 'test4@gmail.com',
        password: 'test123',
        password_confirmation: 'test123',
        name: "testUser1",
        country: "Myanmar",
        ethnicity: 'Bantu',
        religion: "Buddhist",
        gender: "Female",
        date_birth: "15-01-1993",
        date_arrival: "10-06-2024",
        verification_status: "Pending approval"
        ) }
let(:missing_person) do
MissingPerson.create!(
  user: user,
  name: 'testUser1',
  age: 30,
  gender: 'Female',
  ethnicity: 'Bantu',
  matched: false,
  date_birth: Date.new(1993, 1, 15),
  matched_user_id: nil
)
end
  
describe "POST #create" do
context "when missing person does not exist" do
  it "returns an error message" do
    post :create, params: { missing: -1, user_id: user.id }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["message"]).to eq("Missing person does not exist")
  end
end

context "when missing person has already been matched" do
  before do
    missing_person.update(matched: true, matched_user_id: user.id)
  end

  it "returns a message indicating already matched" do
    post :create, params: { missing: missing_person.id, user_id: user.id }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["message"]).to eq("#{missing_person.name} has already been matched with you.")
  end
end

context "when missing person is successfully matched" do
  it "returns a success message" do
    post :create, params: { missing: missing_person.id, user_id: user.id }
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["message"]).to eq("You have successfully matched with #{missing_person.name}.")
    expect(missing_person.reload.matched).to be_truthy
    expect(missing_person.matched_user_id).to eq(user.id)
  end
end

context "when there is an issue saving the match" do
  before do
    allow_any_instance_of(MissingPerson).to receive(:save).and_return(false)
  end

  it "returns an error message" do
    post :create, params: { missing: missing_person.id, user_id: user.id }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["message"]).to eq("There was an issue matching the user. Please try again later.")
  end
end
end

describe "GET #show" do
context "when missing person does not exist" do
  it "returns an error message" do
    get :show, params: { id: 0 }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["message"]).to eq("Missing person does not exist")
  end
end

context "when similar matches are found" do
  it "returns matched users" do
    allow(User).to receive(:find_matches).and_return([{ name: "John Doe" }])
    get :show, params: { id: missing_person.id }
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body).first["name"]).to eq("John Doe")
  end
end

context "when no similar matches are found" do
  it "returns a message indicating no matches" do
    allow(User).to receive(:find_matches).and_return(nil)
    get :show, params: { id: missing_person.id }
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["message"]).to eq("No similar matches were found for this person")
  end
end
end

describe "GET #associated" do
context "when missing person does not exist" do
  it "returns an error message" do
    get :associated, params: { id: 0 }
    expect(response).to have_http_status(:unprocessable_entity)
    expect(JSON.parse(response.body)["message"]).to eq("Missing person does not exist")
  end
end

context "when a user is associated with the missing person" do
  before do
    missing_person.update(matched_user_id: user.id)
  end

  it "returns the associated user" do
    get :associated, params: { id: missing_person.id }
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["id"]).to eq(user.id)
  end
end

context "when no user is associated with the missing person" do
  it "returns a message indicating no association" do
    get :associated, params: { id: missing_person.id }
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body)["message"]).to eq("No users are associated with this missing person")
  end
end
end
end