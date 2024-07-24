Feature: Chatbot 

  Testing features of Chatbot
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Home Page
    Scenario: Successfully asked Chatbot 
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with ""
        Then I should see a message ""

    Scenario: Asked Chatbot invalid question
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with ""
        Then I should see a message ""


    Scenario: Asked Chatbot question it has not been trained for 
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with ""
        Then I should see a message "I'm sorry, I cannot answer that question."
        