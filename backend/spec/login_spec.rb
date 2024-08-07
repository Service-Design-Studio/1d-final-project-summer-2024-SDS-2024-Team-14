require "rails_helper"

RSpec.describe "Login", type: :request do

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
    end

    scenario "Login user success" do
        post "http://localhost:3000/login",
        params:
        {
            email: "test1@gmail.com",
            password: "test123"
        }
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        data = JSON.parse(response.body)
        # check successful message response
        expect(data["message"]).to eq("Login for testUser1 successful")
    end

    scenario "Login user wrong password" do
        post "http://localhost:3000/login",
        params:
        {
            email: "test1@gmail.com",
            password: "test122"
        }
        #check status
        expect(response).to have_http_status(422)
        #check resp
        data = JSON.parse(response.body)
        expect(data["message"]).to eq("Login failed. Please make sure that your password is correct.")
    end

    scenario "Login user wrong email" do
        post "http://localhost:3000/login",
        params:
        {
            email: "test2@gmail.com",
            password: "test123"
        }
        #check status
        expect(response).to have_http_status(422)
        #check resp
        data = JSON.parse(response.body)
        expect(data["message"]).to eq("Login failed. The email you have entered is invalid. Please enter a valid email.")
    end
end