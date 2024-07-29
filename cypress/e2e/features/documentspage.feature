Feature: Documents Page

  Background:
    Given I am on the Documents page 

  Scenario: Accessing Career tab with no document uploaded
    When I click the "Career" button
    And I should not see "career-document"
  
  Scenario: Accessing Education tab with no document uploaded
    When I click the "Education" button
    And I should not see "education-document"
  
  Scenario: Accessing Family tab with no document uploaded
    When I click the "Family" button
    And I should not see "family-document"
  
  Scenario: Accessing Finance tab with no document uploaded
    When I click the "Finance" button
    And I should not see "finance-document"
   
  Scenario: Accessing Health tab with no document uploaded
    When I click the "Health" button
    And I should not see "health-document"

  Scenario: Accessing Property tab with no document uploaded
    When I click the "Property" button
    And I should not see "property-document"

  Scenario: Accessing Career tab with documents uploaded
    When I have added a "career-document"
    And I click the "Career" button
    Then I should see "career-document"
  
  Scenario: Accessing Education tab with documents uploaded
    When I have added a "education-document"
    And I click the "Education" button
    Then I should see "education-document"
  
  Scenario: Accessing Family tab with documents uploaded
    When I have added a "family-document"
    And I click the "Family" button
    Then I should see "family-document"
  
  Scenario: Accessing Finance tab with documents uploaded
    When I have added a "finance-document"
    And I click the "Finance" button
    Then I should see "finance-document"
   
  Scenario: Accessing Health tab with documents uploaded
    When I have added a "health-document"
    And I click the "Health" button
    Then I should see "health-document"

  Scenario: Accessing Property tab with documents uploaded
    When I have added a "property-document"
    And I click the "Property" button
    Then I should see "property-document"

  Scenario: navigating to the Health upload page
     When I click the "Health" button
     And I click the "upload" button
     Then I should be redirected to the documents upload health page 
 
  Scenario: navigating to the Health scan page
      When I click the "Health" button
      When I click the "scanner" button
      Then I should be redirected to the documents scanner health page
