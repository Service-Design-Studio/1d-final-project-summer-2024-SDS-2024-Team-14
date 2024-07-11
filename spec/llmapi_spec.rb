require "rails_helper"

RSpec.describe "llmapi", type: :request do
    
    before do
        mockjson = {
            "name: Peter, 
            date of birth: 03/11/04, 
            student ID: 1001234, 
            degree: Masters in CS, 
            highest education: Bachelor of CS, 
            date obtained: 03/11/10,
            overall GPA: 5.6, 
            institution name: non-existent University, 
            graduation date: 03/08/10"
        }

    scenario "succesfully use the llm to process the inputs" do
        text = llm_process(mockjson)
        # end.to be_an_instance_of(JSON)
        end.to eq(mockjson)