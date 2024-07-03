require "rails_helper"

RSpec.describe "Verify", type: :request do

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

    scenario "Verify user success" do
        get "http://localhost:3000/verify/1"
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        data = JSON.parse(response.body)
         # third user created from earlier api call
         expect(data["message"]).to eq("Approval for testUser1 successful")
    end

    scenario "Verify user fail" do
        get "http://localhost:3000/verify/3"
        #check status 
        expect(response).to have_http_status(422)
        #check resp
        data = JSON.parse(response.body)
         # third user created from earlier api call
        puts data
        expect(data["message"]).to eq("User does not exist")
    end
end