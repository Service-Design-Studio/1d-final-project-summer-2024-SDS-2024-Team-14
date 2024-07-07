require "rails_helper"

RSpec.describe "Translate", type: :request do

    before do
        mock_json = {
            "name": "Peter", 
            "age": "30", 
            "city": "New York" 
            "greeting": "hello"  
        }
    end

    scenario "get translation text" do
        get "http://localhost:3000/translate/",
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        translate = JSON.parse(response.body)
        expect(translate).to be_an_instance_of(JSON)

    end

    scenario "translate success" do
        get "http://localhost:3000/translate/",
        #check status 
        expect(response).to have_http_status(:success)
        #check resp
        translate = JSON.parse(response.body)
        expect(translate).to match({"الاسم": "بيتر" ، "العمر": "30" ، "المدينة": "نيويورك" ، "تحية": "مرحبًا"})

    end

    scenario "translate fail" do
        expect(translate).not_to match({"الاسم": "بيتر" ، "العمر": "30" ، "المدينة": "نيويورك" ، "تحية": "مرحبًا"})
        # expect {<page to throw error?>}.to raise_error(ErrorClass, "Was not able to translate this.")
        # idk how do ^ code line
        expect(data["message"]).to eq("Was not able to translate.") # is this...?
    end
end