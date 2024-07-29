Feature: Documents Page

  Background:
    Given I am on the Documents page 
 
  Scenario: Accessing Health tab with no document uploaded
    When I click the "Health" button
    And I should not see "health-document"

  Scenario: Accessing Health tab with documents uploaded
    When I have added a "health-document"
    And I click the "Health" button
    Then I should see "health-document"

  Scenario: Accessing Career folder in Documents
    When I click the "Career" button
    Then I should see "career-document"


  Scenario: Accessing Education folder in Documents
    When I click the "Education" button
    Then I should see "education-document"

  Scenario: Accessing Property folder in Documents
    When I click the "Property" button
    Then I should see "property-document"

  Scenario: Accessing Family folder in Documents
    When I click the "Family" button
    Then I should see "family-document"

  Scenario: Accessing Finance folder in Documents
    When I click the "Finance" button
    Then I should see "finance-document"

  Scenario: navigating to the upload page
     When I click the "plus" button
     Then I should see the "popupmenu" element
     When I click the "files" button
     Then I should be redirected to the documents upload page 
 
  Scenario: navigating to the scan page
      When I click the "plus" button
      Then I should see the "scanner" element
      When I click the "scanner" button
      Then I should be redirected to the documents scanner health page
