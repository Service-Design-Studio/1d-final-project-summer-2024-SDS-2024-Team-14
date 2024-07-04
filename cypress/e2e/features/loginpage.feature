Feature: Login Page

Testing features of Login Page
# I should have a feature that checks transition to login page
Background: 
    Given I am on the login page

Scenario: Log In Successful
    When I click the "loginTab" button
    When I fill in "email" with "test123@gmail.com"
    And I fill in "password" with "p@ssw0rd"
    And I click the "submitBtn" button
    Then I should be directed to the Home page

Scenario: Log In wrong password
    When I click the "loginTab" button
    When I fill in "email" with "test123@gmail.com"
    And I fill in "password" with "p@ssw0rd1"
    And I click the "submitBtn" button
    And I should see the message "Login unsuccessful!"
    Then I should remain on the Login page

Scenario: Log In invalid email
    When I click the "loginTab" button
    When I fill in "email" with "-"
    And I fill in "password" with "p@ssw0rd"
    And I click the "submitBtn" button
    And I should see the message "error"
    Then I should remain on the Login page

Scenario: Signup successful
    When I click the "signUpTab" button
    When I fill in "firstName" with "Abdul"
    And I fill in "lastName" with "Ahmed"
    And I fill in "email" with "e@gmail.com"
    And I fill in "password" with "Passw0rd!"
    And I click on the "submitBtn" button
    Then I should be directed to the Home page

Scenario: Signing Up Unsuccessfully
    When I click the "signUpTab" button
    When I do not fill in "firstName"
    And I fill in "lastName" with "Ahmed"
    And I fill in "email" with "e@gmail.com"
    And I fill in "password" with "Passw0rd!"
    And I fill in "confirmPassword" with "Passw0rd!"
    And I click the "submitBtn" button
    Then I should remain on the Login Page
# I should have a feature that checks if the login is unsuccessful when the email is not entered
# I should have a feature that checks if the login is unsuccessful when the password is not entered
# I should have a feature that checks if the login is successful when the correct email and password is entered
# I should have a feature that checks if the login is unsuccessful when the wrong email and password is entered
