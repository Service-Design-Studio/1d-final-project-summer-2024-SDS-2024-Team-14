Feature: Documents Page

  Testing features of Documents Page
  #I should have a feature that checks transition to the Documents page
  Background:
    Given I am on the Documents page 

  Scenario: Back Button
    When I click on the Back button
    Then I should be redirected to the Home Page

  Scenario: Adding Documents
    When I click on the "plus" button
    Then I should see a pop-up menu with the following options:
      Scan  
      Files
    When I click on the "Scan" button
    Then I should be navigated to the "Scan" page
    When I click on the "plus" button
    Then I click on the "Files" button
    Then I should be navigated to the "upload" page

  Scenario: Accessing Documents in Folders
    Then I should see Cards with the following title:
      Health
      Career
      Education
      Family
      Finance
      Property
    When I click on the "Folder_Title" button
    Then I should be navigated to the "Folder_Title" page

