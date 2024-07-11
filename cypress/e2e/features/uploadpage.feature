 Feature: Upload Page

  Testing features of Upload Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I have clicked to the Upload page 
    
# Scenario: Attempt to upload file without selecting category   
#     When I click the "dropzone" button
#     And I have attached ''
#     When I click the "upload" button
#     Then I should see the message "Please choose a category first before uploading"

Scenario: If no documents uploaded, error message received
    When I click the "upload" button
    Then I should be getting an error notification
    #not done with error notification

Scenario: Successfully uploading documents
    When I click the "dropdownmenu" 
    Then I click the "Health"
    #making sure that any category is choosen
    Then I click the "dropzone" button
    Then I should be able to add new files
#    Then I should see previews of my uploaded files
    Then I click the "upload" button
    Then I should then return to the documents page 
