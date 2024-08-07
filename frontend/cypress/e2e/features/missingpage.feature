Feature: Missing Family Page

Background:
    Given I am on "Missing Family & Friends" page

Scenario: No missing person entry
    Then I should not see "missing-person-entry"

Scenario: Attempt to add missing person entry without filling all fields
    When I click the "add_new" button
    And I fill in "age" with "12"
    And I click the new form's save changes button
    Then I should see the "pop_up" has text "Please fill in all details in the form before saving."

Scenario: Add missing person entry successfully
    When I click the "add_new" button
    And I fill in "name" with "Abdul Ahmed"
    And I fill in "age" with "2"
    And I fill in "ethnicity" with "Arab"
    And I click the "female" button
    And I set birthdate to 8 April 2021
    And I click the new form's save changes button
    Then I should see "missing-person-entry"

    

Scenario: View missing person entry
    When I click the "add_new" button
    And I fill in "name" with "Abdul Ahmed"
    And I fill in "age" with "2"
    And I fill in "ethnicity" with "Arab"
    And I click the "female" button
    And I set birthdate to 8 April 2021
    And I click the new form's save changes button
    And I should see "missing-person-entry"
    Then I should see the "missing-person-card" has text "Abdul Ahmed"

Scenario: Attempt to edit missing person entry without filling all fields
    When I click the "add_new" button
    And I fill in "name" with "Abdul Ahmed"
    And I fill in "age" with "2"
    And I fill in "ethnicity" with "Arab"
    And I click the "female" button
    And I set birthdate to 8 April 2021
    And I click the new form's save changes button
    And I should see "missing-person-entry"
    Then I should see the "missing-person-card" has text "Abdul Ahmed"
    When I click the "edit" button
    And I fill in "name" with nothing
    And I click the edit form's save changes button
    Then I should see the "pop-up" has text "Please fill in all details in the form before saving."
    
Scenario: Edit missing person entry successfully
    When I click the "add_new" button
    And I fill in "name" with "Abdul Ahmed"
    And I fill in "age" with "2"
    And I fill in "ethnicity" with "Arab"
    And I click the "female" button
    And I set birthdate to 8 April 2021
    And I click the new form's save changes button
    And I should see "missing-person-entry"
    Then I should see the "missing-person-card" has text "Abdul Ahmed"
    When I click the "edit" button
    And I fill in "name" with nothing
    And I fill in "name" with "John Smith"
    And I click the edit form's save changes button
    Then I should see the "missing-person-card" has text "John Smith"
Scenario: Delete missing person entry successfully
    When I click the "add_new" button
    And I fill in "name" with "Abdul Ahmed"
    And I fill in "age" with "2"
    And I fill in "ethnicity" with "Arab"
    And I click the "female" button
    And I set birthdate to 8 April 2021
    And I click the new form's save changes button
    And I should see "missing-person-entry"
    Then I should see the "missing-person-card" has text "Abdul Ahmed"
    When I click on the "delete" button
    Then I should not see "missing-person-entry"