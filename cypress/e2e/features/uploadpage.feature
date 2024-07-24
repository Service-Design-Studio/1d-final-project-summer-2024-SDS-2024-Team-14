 Feature: Upload Page

  Testing features of Upload Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the documents upload education page 
    
# Scenario: Attempt to upload file without selecting category   
#     When I click the "dropzone" button
#     And I have attached ''
#     When I click the "upload" button
#     Then I should see the message "Please choose a category first before uploading"

Scenario: If no documents uploaded, error message received
    Then I should not be able to click the "upload" button
    #not done with error notification

Scenario: Successfully uploading documents to education category
    #making sure that any category is choosen
    When I click the "dropzone" button
    And I add new files
    Then I should see "preview"
    When I click the "preview" button
    Then I should see "preview_modal"
    When I click the "close" button
    And I submit my documents by the upload button
    Then I should be redirected to the documents page 
