Feature: Chatbot 

  Testing features of Chatbot
  Background:
    
    Given I am on the Home Page
    Given My verification status is already approved

    Scenario: Successfully asked Chatbot 
        When I click "Chatbot" button 
        Then I type - my query on how do I upload my documents 
        When I press the enter key 
        Then I should see a reply "with instructions to upload my documents"

    Scenario: Asked Chatbot invalid question
        When I click "Chatbot" button 
        Then I type - gibberish
        When I accidentally press the enter key
        Then I should see a reply "asking for further clarification"


    Scenario: Asked Chatbot question it has not been trained for 
        When I click "Chatbot" button 
        Then I type - a query that is unable to be answered by the chatbot
        When I press enter
        Then I should see a reply "redirecting me to other contacts"
    
    
    Scenario: Asked Chatbot question in Burmese
        When I click "Chatbot" button 
        Then I type - my query on how do I upload my documents in Burmese
        When I press enter to send my query to the chatbot
        Then I should see a reply "with instructions on how to upload my documents in Burmese" 
