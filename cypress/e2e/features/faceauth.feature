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
   Then I should see "verified"

  Scenario: Face match timeout
    When I click the "dropzone" button
    Then I add new photo
    Then I click the "proceed" button
    Then I click the "begin" button
    Then I did not show my face within 15s 
    Then I should see "failure"

  Scenario: Stopping the face scan in the middle of scanning
    When I click the "dropzone" button
    Then I add new photo
    Then I click the "proceed" button
    Then I click the "begin" button
    Then I decided that I would like to cancel the scanning
    Then I click the "stop" button

  Scenario: Skipping the scanning process
    When I click the "dropzone" button
    Then I add new photo
    Then I click the "proceed" button
    When I click the "skip" button
    When I click the "confirmation" button
    Then I should be redirected to the home page
    Then I should see "alert"


    

