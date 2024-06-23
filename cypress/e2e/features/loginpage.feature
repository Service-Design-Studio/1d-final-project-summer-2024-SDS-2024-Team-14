Feature: Login Page

Testing features of Login Page
# I should have a feature that checks transition to login page
Background: 
    Given I am on the login page

Scenario: Logging In successfully
    When I fill in "Username" with "1"
    And I fill in "Password" with "p@ssw0rd"
    And I click the "login" button
    And I should see the message "Login successful!"
    Then I should be redirected to the Home page

Scenario: Logging In unsuccessfully
    When I fill in "Username" with "-"
    And I fill in "Password" with "-"
    And I click the "login" button
    And I should see the message "Login unsuccessful!"
    Then I should remain on the Login page

# I should have a feature that checks if the login is unsuccessful when the username is not entered
# I should have a feature that checks if the login is unsuccessful when the password is not entered
# I should have a feature that checks if the login is successful when the correct username and password is entered
# I should have a feature that checks if the login is unsuccessful when the wrong username and password is entered
