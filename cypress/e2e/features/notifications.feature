Feature: Notification Bar

    Testing features of Notification Bar
    # I should have a feature that checks transition to login page

Background: 
    Given I am on the documents upload education page

Scenario: When I upload a document, I should see a new notification
    When I click the "dropzone" button
    And I add new files
    And I should see "preview"
    And I submit my documents by the upload button
    And I should be redirected to the documents page 
    # remove next line when nav header is implemented in documents
    When I am on the home page
    And I should see "new_notification_icon"
    When I click the "notification" button
    Then I should see "new_notification"

Scenario: When I have not uploaded any document, I should not see any new notification
    When I am on the home page
    Then I should see "notification_icon"
    When I click the "notification" button
    Then I should not see "new_notification"
