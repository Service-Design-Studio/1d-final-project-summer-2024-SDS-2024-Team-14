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
    When I click the "Upload" button
    Then I should be getting an error notification

Scenario: Successfully uploading documents
    When I click the "dropdownmenu" 
    Then I click on "option_name" menu item 
    #making sure that category is choosen
    Then I click on the "dropzone"
    Then I should be able add new files 
    Then I should see previews of my uploaded files 
    Then I click on the 'Upload' button 
    Then I should be redirected to the documents page 
