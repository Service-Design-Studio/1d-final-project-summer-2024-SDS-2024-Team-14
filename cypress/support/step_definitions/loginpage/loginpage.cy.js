import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js"
import { loginPage } from "../../utils"


When("I click on the \"submitBtn\" button", () => {
    cy.intercept("POST", '/login', (req) => {
            req.reply({
              statusCode: 200,
              fixture: 'login_successful.json'
            })
          }).as('loginRequest');
    cy.get("#submitBtn").click()
})

Then("I should be directed to the Home page", () => {
    cy.url().should('eq', Cypress.config().baseUrl+'')
})
