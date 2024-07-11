import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
// import "../general_definitions.cy.js";

// Given(/^I have clicked to the (.+) page$/i, (page) => {
//     cy.visit(Cypress.config().baseUrl+'documents'+page.toLowerCase() === "documents" ? "/" : `/${page.toLowerCase().replace(' ', '/')}`);
// })


Given(/^I have clicked to the (.+) page$/i, (page) => {
    const baseUrl = Cypress.config().baseUrl;
    const uploadPageUrl = `${baseUrl}documents/upload`;

    // Visit the upload page
    cy.visit(uploadPageUrl);

    // Assert that the URL is correct
    cy.url().should("eq", uploadPageUrl);
})
