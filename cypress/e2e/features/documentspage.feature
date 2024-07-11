Feature: Documents Page

  Testing features of Documents Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Documents page 

#   Scenario: Scanning Documents Successful
#     When I click the "plus" button
#     Then I should see option "scan"
#     When I click on the "scan" button
#     Then I should be navigated to the "scan" page
#     Then I should be able to see my camera live inputs
#     When I click the "Capture" button 
#     Then I should be able to take a picture 
#     Then I should be able to see the parsed information

# #hw
#    Scenario: Scanning Documents Unsuccessful  
#     Given I am on the picture upload page
#     When I click the "Capture" button
#     And the picture is too unclear to be parsed
#     Then I should see a message "Please retake the picture."
  
  Scenario: Successful in adding Documents
    When I click the "plus" button
    Then I should see the "popupmenu"
    When I click the "files" button
    Then I should be redirected to the Upload page 
    When I click the "dropdownmenu" button
    # #
    # Then I should see a list of options
    # When I click on "option_name" menu item
    # Then I click on the "dropzone"
    # Then I should be able add new files 
    # Then I should be able to see previews of my uploaded files 
    # Then I click on the 'Upload' button 
    # Then I should be able to see the message document has been successfully uploaded

  # Scenario: Unsuccessful in adding Documents
  #   When I click on the "plus" button
  #   Then I should see option "files"
  #   Then I click on the "files" button
  #   Then I should be navigated to the "Upload" page
  #   When I click on the dropdown menu
  #   Then I should see a list of options
    # When I do not click on "option_name" menu item
    # Then I click on the "dropzone"
    # Then I should be able add new files 
    # When I click on the 'Upload' button
    # Then I should be able to see the message to choose the category document belongs to 

# #hw
#   Scenario: Accessing Documents in Folders
#     Then I should see Cards with the following title: Health, Career, Education, Family, Finance, Property
#     When I click on the "Folder_Title" button
#     Then I should be navigated to the "Folder_Title" page
#     Then I should be able to see the status of each file 


