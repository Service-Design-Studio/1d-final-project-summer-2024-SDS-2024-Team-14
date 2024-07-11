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
    Then I should be redirected to the documents health page

  Scenario: Accessing Career folder in Documents
    Then I should see "Career"
    When I click the "Career"
    Then I should be redirected to the documents career page

  Scenario: Accessing Education folder in Documents
    Then I should see "Education"
    When I click the "Education"
    Then I should be redirected to the documents Education page

  Scenario: Accessing Property folder in Documents
    Then I should see "Property"
    When I click the "Property"
    Then I should be redirected to the documents Property page

  Scenario: Accessing Family folder in Documents
    Then I should see "Family"
    When I click the "Family"
    Then I should be redirected to the documents Family page

  Scenario: Accessing Finance folder in Documents
    Then I should see "Finance"
    When I click the "Finance"
    Then I should be redirected to the documents Finance page