import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


When('I press the enter key', () => {
    cy.get('#Input').type('{enter}');
    // Intercept the axios call before triggering the upload button
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot1.json'
      });
    }).as('chatbot');

    cy.get()
});

Then(/^I should see a reply "(.+)"$/i, (msg) => {
    cy.get('#chat-feed').should('contain.text', msg);
})