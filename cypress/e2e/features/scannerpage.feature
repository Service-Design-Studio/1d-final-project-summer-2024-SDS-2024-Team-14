Feature: Scanner Page

  Testing features of Documents Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Scanner page 
    Scenario: Scanning Documents Successful
        Then I should be able to see my camera live inputs
        When I click the "Capture" button 
        Then I should be able to take a picture 
        Then I should be able to see the parsed information

    Scenario: Scanning Documents unsuccessful 
        Given I am on the picture upload page
        When I click the "Capture" button
        And the picture is too unclear to be parsed
        Then I should see a message "Please retake the picture."