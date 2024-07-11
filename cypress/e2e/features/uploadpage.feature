 Feature: Upload Page

  Testing features of Upload Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I have clicked to the Upload page 
    
Scenario: testing dropdown menu   
    When I click the "dropdownmenu" button
    Then I should see a list of options
    When I do not click on "option_name" menu item
    Then I click on the "dropzone"
    Then I should be able add new files 
    When I click on the 'Upload' button
    Then I should be able to see the message to choose the category document belongs to 

Scenario: testing 
    When I click the "dropdownmenu" button
    Then I should see a list of options
    When I click on "option_name" menu item
    Then I click on the "dropzone"
    Then I should be able add new files 
    Then I should be able to see previews of my uploaded files 
    Then I click on the 'Upload' button 
    Then I should be able to see the message document has been successfully uploaded
