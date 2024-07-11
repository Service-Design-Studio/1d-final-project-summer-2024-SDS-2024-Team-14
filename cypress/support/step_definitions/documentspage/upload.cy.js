import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";

// Given(/^I have clicked to the (.+) page$/i, (page) => {
//     cy.visit(Cypress.config().baseUrl+'documents'+page.toLowerCase() === "documents" ? "/" : `/${page.toLowerCase().replace(' ', '/')}`);
// })


Given(/^I have clicked to the (.+) page$/i, (page) => {
    const baseUrl = Cypress.config().baseUrl;
    const uploadPageUrl = `${baseUrl}documents/upload`;

    cy.visit(uploadPageUrl);

    cy.url().should("eq", uploadPageUrl);
})

When(/^I attempt to upload a file without selecting a category$/, () => {
    cy.get('#dropzone').click(); 
});

Then(/^I should see the error message "(.+)"$/, (message) => {
    cy.contains(message).should('be.visible');
});