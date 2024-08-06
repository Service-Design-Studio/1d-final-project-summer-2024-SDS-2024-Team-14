Feature: Verify Page
  Background:
    Given I am on the Passport page

  Scenario: Face match approved
   When I click the "dropzone" button
   Then I add new photo
   Then I click the "proceed" button
   Then I click the "begin" button
   Then I show my face
   Then I should see a successful match 

  Scenario: Face match timeout
    When I click the "dropzone" button
    Then I add new photo
    Then I click the "proceed" button
    Then I click the "begin" button
    Then I did not show my face within 15s 
    Then I should see "failure" 

    
    

