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
            ethnicity: 'Bantu',
            "religion": "Buddhist",
            "gender": "Female",
            "date_birth": "10-06-2001",
            "date_arrival": "10-06-2024",
            "verification_status": "Pending approval"
            )
        User.create(
            email: 'test2@gmail.com', 
            password: 'test123', 
            password_confirmation: 'test123', 
            name: 'testUser2', 
            country: 'Panana',
            ethnicity: 'Arab',
            "religion": "Muslim",
            "gender": "Male",
            "date_birth": "10-06-2004",
            "date_arrival": "14-06-2024",
            "verification_status": "Approved"
            )
    end

    scenario "Create user success" do
        post "http://localhost:3000/users",
        params: 
        {
            email: "test3@gmail.com",
            password: "test123",
            password_confirmation: "test123",
            name: "testUser3",
            country: "Peru",
            ethnicity: "Hazara",
            religion: "Buddhist",
            gender: "Female",
            date_birth: "10-04-2022",
            date_arrival: "10-04-2022"
        }
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        data = JSON.parse(response.body)
         # third user created from earlier api call
         expect(data["message"]).to eq("Signup for user testUser3 successful")
         expect(data["user_id"]).to eq(3)
    end

    scenario "Create user fail" do
        post "http://localhost:3000/users",
        params: 
        {
            email: "test3@gmail.com",
            password_confirmation: "test123",
            name: "testUser3",
            country: "Peru",
            ethnicity: "Hazara",
            religion: "Buddhist",
            gender: "Female",
            date_birth: "10-04-2022",
            date_arrival: "10-04-2022"
        }
        #check status 
        expect(response).to have_http_status(422)
        data = JSON.parse(response.body)
        expect(data["password"]).to eq(["can't be blank"])

    end
    
    scenario "Get all users information" do
    
        get "http://localhost:3000/users"
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        users = JSON.parse(response.body)
        first_user, second_user = users[0], users[1], users[2]
        # first user created
        expect(first_user["id"]).to eq(1)
        expect(first_user["email"]).to eq("test1@gmail.com")
        expect(first_user["name"]).to eq("testUser1")
        expect(first_user["country"]).to eq("Myanmar")
        expect(first_user["religion"]).to eq("Buddhist")
        expect(first_user["ethnicity"]).to eq("Bantu")
        expect(first_user["gender"]).to eq("Female")
        expect(first_user["date_birth"]).to eq("10-06-2001")
        expect(first_user["date_arrival"]).to eq("10-06-2024")
        expect(first_user["verification_status"]).to eq("Pending approval")
        # second user created
        expect(second_user["id"]).to eq(2)
        expect(second_user["email"]).to eq("test2@gmail.com")
        expect(second_user["name"]).to eq("testUser2")
        expect(second_user["country"]).to eq("Panana")
        expect(second_user["religion"]).to eq("Muslim")
        expect(second_user["ethnicity"]).to eq("Arab")
        expect(second_user["gender"]).to eq("Male")
        expect(second_user["date_birth"]).to eq("10-06-2004")
        expect(second_user["date_arrival"]).to eq("14-06-2024")
        expect(second_user["verification_status"]).to eq("Approved")
    
    end

    scenario "Get user information based on Id Success" do
    
        get "http://localhost:3000/users/2"
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        user = JSON.parse(response.body)
        # user retrieved
        expect(user["id"]).to eq(2)
        expect(user["email"]).to eq("test2@gmail.com")
        expect(user["name"]).to eq("testUser2")
        expect(user["country"]).to eq("Panana")
        expect(user["religion"]).to eq("Muslim")
        expect(user["ethnicity"]).to eq("Arab")
        expect(user["gender"]).to eq("Male")
        expect(user["date_birth"]).to eq("10-06-2004")
        expect(user["date_arrival"]).to eq("14-06-2024")
        expect(user["verification_status"]).to eq("Approved")
    end

    scenario "Get user information based on Id, Invalid Id" do
    
        get "http://localhost:3000/users/5"
        #check status 
        expect(response).to have_http_status(422)
        #check resp
        data = JSON.parse(response.body)
        # user retrieved
        expect(data["message"]).to eq("User does not exist")
    end

end