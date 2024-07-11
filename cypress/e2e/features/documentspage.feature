Feature: Documents Page

  Testing features of Documents Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Documents page 
  
   Scenario: navigating to the upload page
     When I click the "plus" button
     Then I should see the "popupmenu" element
     When I click the "files" button
     Then I should be redirected to the documents upload page 
 
  Scenario: navigating to the scan page
      When I click the "plus" button
      Then I should see the "scanner" element
      When I click the "scanner" button
      Then I should be redirected to the documents scanner page

  # Scenario: Accessing Documents in Folders
  #   Then I should see Cards with the following title: Health, Career, Education, Family, Finance, Property
  #   When I click on the "Folder_Title" button
  #   Then I should be navigated to the "Folder_Title" page
  #   Then I should be able to see the status of each file 
    
  Scenario: Accessing Health folder in Documents
    Then I should see "Health"
    When I click the "Health"
