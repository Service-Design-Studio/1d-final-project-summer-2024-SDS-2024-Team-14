Feature: Home Page

  Testing features of Home Page
  #I should have a feaature that checks transition to the home page
#  Scenario: Home Page
#    Given I open the home page


  Scenario: Clicking UNHCR button
    Given I am on the Home page
    When I click on the "Show UNHCR Card" button
    Then I see the identification number revealed
    And I see a QR Code within this card
    And the QR Code should have my id bounded to it

