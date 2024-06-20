import { Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import {homePage} from "../../utils"

Given("I am on the Home page", () => {
  cy.visit('/')
})

When("I click on the Show UNHCR Card button", () => {
  homePage.clickCardButton()
})

Then("I see the identification number revealed", () => {
  homePage.checkIdentificationNumber()
})

Then("I see a QR Code within this card", () => {
  homePage.checkQrCode()
})
