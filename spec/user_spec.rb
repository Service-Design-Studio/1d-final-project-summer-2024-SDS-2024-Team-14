require "rails_helper"

RSpec.describe "Users", type: :request do

    before do
        #seed data
        User.create(email: 'test1@gmail.com', password: 'test123', password_confirmation: 'test123', name: 'testUser1', country: 'Myanmar')
        User.create(email: 'test2@gmail.com', password: 'test123', password_confirmation: 'test123', name: 'testUser2', country: 'Arab')
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
        # second user created
        expect(second_user["id"]).to eq(2)
        expect(second_user["email"]).to eq("test2@gmail.com")
        expect(second_user["name"]).to eq("testUser2")
        expect(second_user["country"]).to eq("Arab")
    
    end
end