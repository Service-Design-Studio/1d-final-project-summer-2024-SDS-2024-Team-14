Feature: Notification Bar

    Testing features of Notification Bar
    # I should have a feature that checks transition to login page

    Background: 
        Given I am on the Education page

Scenario: When I upload a document, I should see a notification popup
    When I click on the "Upload" button
    Then I should be redirected to the upload page
    Then I click the "dropzone" button
    Then I should be able to add new files
    When I click a file 
    Then I should see previews of my uploaded file
    When I submit my documents by the upload button
    Then I should then return to the documents page
    When I click the "notification red dot" button
    Then I should see the message

Scenario: When there are no new notifications, I do not see the red dot notice 
    When I click the "notification" button
    Then I should see no message
