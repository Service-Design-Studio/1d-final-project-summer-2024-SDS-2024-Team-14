Feature: Login Page

Testing features of Login Page
# I should have a feature that checks transition to login page
Background: 
    Given I am on the login page

# I should have a feature that checks if the login page has a form
Scenario: Check if the login form exists
    Then I should see the login form exists
# I should have a feature that checks if the login page has a username field
Scenario: Check if login page has a username field
    Then I should see the "username" field exists
# I should have a feature that checks if the login page has a password field
Scenario: Check if login page has a password field
    Then I should see the "password" field exists
# I should have a feature that checks if the login page has a login button
Scenario: Check if login page has a login button
    Then I should see the "login" button exists
# I should have a feature that checks if the login page has a forget password button
Scenario: Check if login page has a forget password button
    Then I should see the "forget password" button exists
# I should have a feature that checks if the login is unsuccessful when the username is not entered
# I should have a feature that checks if the login is unsuccessful when the password is not entered
# I should have a feature that checks if the login is successful when the correct username and password is entered
# I should have a feature that checks if the login is unsuccessful when the wrong username and password is entered
