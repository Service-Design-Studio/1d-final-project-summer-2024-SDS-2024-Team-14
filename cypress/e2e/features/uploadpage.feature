 Feature: Upload Page

  Testing features of Upload Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I have clicked to the Upload page 
    
Scenario: Attempt to upload file without selecting category   
    When I click the "dropzone" button
    And I have selected files to upload
    When I click the "upload" button
    Then I should see the message "Please choose a category first before uploading"

Scenario: testing 
    When I click the "dropdownmenu"
    Then I should see a list of options
    When I click on "option_name" menu item
    Then I click on the "dropzone"
    Then I should be able add new files 
    Then I should be able to see previews of my uploaded files 
    Then I click on the 'Upload' button 
    Then I should be able to see the message document has been successfully uploaded
