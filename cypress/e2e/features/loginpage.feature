Feature: Login Page

Testing features of Login Page
# I should have a feature that checks transition to login page
Background: 
    Given I am on the login page

Scenario: Log In Successful
    When I click the "loginTab" button
    And I fill in "email" with "test123@gmail.com"
    And I fill in "password" with "p@ssw0rd"
    And I click on the "submitBtn" button - login success
    Then I should be redirected to the Home page

Scenario: Log In wrong password
    When I click the "loginTab" button
    And I fill in "email" with "test123@gmail.com"
    And I fill in "password" with "p@ssw0rd1"
    And I click on the "submitBtn" button - wrong password
    And I should be notified of the wrong password
    Then I should remain on the Login page

Scenario: Log In invalid email
    When I click the "loginTab" button
    And I fill in "email" with "-@gmail.com"
    And I fill in "password" with "p@ssw0rd"
    And I click on the "submitBtn" button - invalid email
    And I should be notified of the invalid email
    Then I should remain on the Login page

Scenario: Signup successful
    When I click the "signUpTab" button
    And I fill in "firstName" with "Abdul"
    And I fill in "lastName" with "Ahmed"
    And I fill in "originCountry" with "Africa"
    And I fill in "ethnicity" with "African American"
    And I fill in "gender" with "Male"
    And I fill in "religion" with "Buddhist"
    And I fill in "email" with "e@gmail.com"
    And I fill in "password" with "Passw0rd!"
    And I fill in "confirmPassword" with "Passw0rd!"
    And I click on the "submitBtn" button - signup success
    Then I should be redirected to the Home page

Scenario: Signing Up Unsuccessfully
    When I click the "signUpTab" button
    And I do not fill in "firstName"
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
