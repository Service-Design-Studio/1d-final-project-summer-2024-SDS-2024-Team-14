import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";
import { homePage } from "../../utils";

Then("the QR Code should have my id bounded to it", () => {
  homePage.checkQrCodeUrl()
})

/* Scenario: Scanning the qrcode */
When("I scan the QRCode",() =>{
  homePage.returnQrCodeUrl().then((relativePart) => {
    cy.visit(relativePart)
  })
})

Then("I should see more information on the user",() =>{
  cy.get('.id-card').contains('Religion')
})

 /* Non verified user*/
Given("My verification status is not approved yet", () => {
  homePage.unverified()
})


