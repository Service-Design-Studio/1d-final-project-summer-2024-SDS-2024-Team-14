Feature: Tutorial 

  Scenario: First Introduction
    Given I am on the login page
    When I click the "signup_tab" button
    And I fill in "firstName" with "Abdul"
    And I fill in "lastName" with "Ahmed"
    And I fill in "originCountry" with "Africa"
    And I fill in "ethnicity" with "African American"
    And I fill in "gender" with "Male"
    And I fill in "religion" with "Buddhist"
    And I fill in "email" with "e@gmail.com"
    And I fill in "password" with "Passw0rd!"
    And I fill in "confirmPassword" with "Passw0rd!"
    And I click the "signup" button
    Then as I am a first time user I should be redirected to the intro page
    Then I click on the next button till the last slide

  Scenario: Home page tutorial
   Given I am on the home page
   When I click on the "tutorial" button
   Then I should see the correct tutorial content for "Home"

  Scenario: Documents tutorial
    Given I am on the home page
    When I click on the "tutorial" button
    Then I should see the correct tutorial content for "Documents"

  Scenario: Family tree tutorial
    Given I am on the home page
    When I click on the "tutorial" button
    Then I should see the correct tutorial content for "Family Tree"

