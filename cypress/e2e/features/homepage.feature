Feature: Home Page

  Testing features of Home Page
  #I should have a feaature that checks transition to the home page
#  Scenario: Home Page
#    Given I open the home page
  Background:
    Given I am on the Home page

  Scenario: Clicking UNHCR button
    Given I click on the Show UNHCR Card button
    Then I should see the identification number revealed
    And I should see a QR Code within this card
    And the QR Code should have my id bounded to it

  Scenario: Scanning the qrcode
    Given I click on the Show UNHCR Card button
    When I scan the QRCode
    Then I should be redirected to the information page of the user
    And I should see more information on the user



