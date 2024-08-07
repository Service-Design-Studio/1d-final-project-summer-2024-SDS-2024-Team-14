Feature: Home Page
  Background:
    Given I am on the Home page

  Scenario: Verification status approved
    Given my refugee status is approved
    And I click the "Show_UNHCR_Card" button
    And I should see the "identification_number" has text "1"
    And I should see "QR_code"
    Then the QR Code should have my id bounded to it

  Scenario: Scanning the qrcode
    Given my refugee status is approved
    And I click the "Show_UNHCR_Card" button
    And I should see "QR_code"
    When I scan the QRCode
    Then I should be redirected to the info page
    And I should see more information on the user

  Scenario: Verification status not approved
    Given My refugee status is not approved
	  And I should see the "id_card_button" has text "Pending Approval"
    And I should not see "QR_code"




