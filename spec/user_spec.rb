require "rails_helper"

RSpec.describe "Users", type: :request do

    before do
        #seed data
        User.create(
            email: 'test1@gmail.com',
            password: 'test123',
            password_confirmation: 'test123',
            "name": "testUser1",
            "country": "Myanmar",
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024"
            )
        User.create(
            email: 'test2@gmail.com', 
            password: 'test123', 
            password_confirmation: 'test123', 
            name: 'testUser2', 
            country: 'Arab',
            "religion": "Muslim",
            "gender": "Male",
            "date_birth": "10-06-2004",
            "date_arrival": "14-06-2024"
            )
    end
    
    scenario "Get all users information" do
    
        get "http://localhost:3000/users"
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        users = JSON.parse(response.body)
        first_user, second_user = users[0], users[1]
        puts first_user
        # first user created
        expect(first_user["id"]).to eq(1)
        expect(first_user["email"]).to eq("test1@gmail.com")
        expect(first_user["name"]).to eq("testUser1")
        expect(first_user["country"]).to eq("Myanmar")
        expect(first_user["religion"]).to eq("Buddhist")
        expect(first_user["gender"]).to eq("Female")
        expect(first_user["date_birth"]).to eq("10-06-2001")
        expect(first_user["date_arrival"]).to eq("10-06-2024")
        # second user created
        expect(second_user["id"]).to eq(2)
        expect(second_user["email"]).to eq("test2@gmail.com")
        expect(second_user["name"]).to eq("testUser2")
        expect(second_user["country"]).to eq("Arab")
        expect(second_user["religion"]).to eq("Muslim")
        expect(second_user["gender"]).to eq("Male")
        expect(second_user["date_birth"]).to eq("10-06-2004")
        expect(second_user["date_arrival"]).to eq("14-06-2024")
    
    end
end