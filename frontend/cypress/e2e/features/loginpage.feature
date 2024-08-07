Feature: Login Page

Testing features of Login Page
# I should have a feature that checks transition to login page
Background: 
    Given I am on the login page

Scenario: Log in successfully with correct credential
    When I click the "login_tab" button
    And I fill in "email" with "elliotphua@gmail.com"
    And I fill in "password" with "Password123"
    And I click on the "login" button
    Then I should be redirected to the Home page

Scenario: Log in unsuccessfully with wrong password
    When I click the "login_tab" button
    And I fill in "email" with "elliotphua@gmail.com"
    And I fill in "password" with "p@ssw0rd1"
    And I click on the "login" button
    And I should see the text, "Login failed. Please make sure that your password is correct."
    Then I should remain on the Login page

Scenario: Log in unsuccessfully with invalid email
    When I click the "login_tab" button
    And I fill in "email" with "-@gmail.com"
    And I fill in "password" with "p@ssw0rd"
    And I click on the "login" button
    And I should see the text, "Login failed. The email you have entered is invalid. Please enter a valid email."
    Then I should remain on the Login page

Scenario: Signup successful
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
    And I click on the "signup" button
    Then I should be redirected to the Home page

Scenario: Signing Up Unsuccessfully
    When I click the "signup_tab" button
    And I do not fill in "firstName"
    And I fill in "lastName" with "Ahmed"
    And I fill in "email" with "e@gmail.com"
    And I fill in "password" with "Passw0rd!"
    And I fill in "confirmPassword" with "Passw0rd!"
    And I click on the "signup" button
    Then I should remain on the Login Page
# I should have a feature that checks if the login is unsuccessful when the email is not entered
# I should have a feature that checks if the login is unsuccessful when the password is not entered
# I should have a feature that checks if the login is successful when the correct email and password is entered
# I should have a feature that checks if the login is unsuccessful when the wrong email and password is entered
