import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy"
import { loginPage } from "../../utils"

When(/^I click the "(.+)" button$/i, (btn) => {
    cy.contains(btn).click();
})

When(/^I fill in "(.+)" with "(.+)"$/i, (e1, e2) => {
    cy.get(e1).type(e2);
})

Then(/^Then I should see the message "(.+)"$/i, (msg) => {
    cy.on(window.alert, (txt) => {
        expect(txt).to.contains(msg);
    });
})

Then(/^I should (be redirected to|remain on) the (.+) page$/i, (page) => {
    cy.url().should("eq", Cypress.config().baseUrl + (page.toLowerCase() === "home" ? "" : `${page.toLowerCase().replace(' ','-')}`));
})
