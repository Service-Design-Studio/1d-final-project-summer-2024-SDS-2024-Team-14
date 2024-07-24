Feature: Chatbot 

  Testing features of Chatbot
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Home Page
    Scenario: Successfully asked Chatbot 
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with "How do I upload my documents"
        Then I should see a message "To upload your documents, click on the Document Manager button on the navigation bar at the top of the page. Choose your category and then click the upload or scan button at the top right of the screen. You can then choose the files or scan your files with the device camera. Thank you."

    Scenario: Asked Chatbot invalid question
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with "qwert"
        Then I should see a message "I'm sorry, I don't understand. Could you please rephrase your question?"


    Scenario: Asked Chatbot question it has not been trained for 
        When I click the "Chatbot" button 
        Then I should see the Chatbot element
        Then I fill in "Input" with "Where is Tony?"
        Then I should see a message "I'm sorry, I cannot answer that question. Please click the Community link above to contact us if you would like more assistance."
    
    Scenario: Persist chat history
        When I click the "Chatbot" button
        T