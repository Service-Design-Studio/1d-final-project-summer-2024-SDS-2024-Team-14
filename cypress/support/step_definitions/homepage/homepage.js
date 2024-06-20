import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


Given("I am on the Home page", () => {
  cy.visit('/')
})
