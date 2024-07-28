import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";
import { homePage } from "../../utils";

Then("the QR Code should have my id bounded to it", () => {
  homePage.checkQrCodeUrl()
})

/* Scenario: Scanning the qrcode */

Given("that the Show UNHCR Card button has been clicked",() =>{
  homePage.clickCardButton()
})

When("I scan the QRCode",() =>{
  homePage.returnQrCodeUrl().then((relativePart) => {
    cy.visit(relativePart)
  })
})

Then("I should be redirected to the information page of the user",() =>{
  cy.url().should("contains", "/info/")
})

Then("I should see more information on the user",() =>{
  cy.get('.id-card').contains('Religion')
})

 /* Non verified user*/

Given("My verification status is not approved yet", () => {
  homePage.unverified()
})

Then("the E-card button should show Pending Approval", () => {
  homePage.checkCardButton()
})

Then("I will not be able to access the QRCode", () => {
  homePage.clickCardButton()
  homePage.checkQrCodeDoesNotExist()
})


