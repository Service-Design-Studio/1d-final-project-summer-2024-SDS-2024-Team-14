import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


When('I press the enter key in S1', () => {
    // Intercept the axios call before triggering the upload button
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot1.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('in S2 I press enter', () => {
    // Intercept the axios call before triggering the upload button
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot2.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('I press the enter key in S3', () => {
    // Intercept the axios call before triggering the upload button
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot3.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('I press the enter key in S4', () => {
    // Intercept the axios call before triggering the upload button
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot4.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});


Then(/^I should see a reply "(.+)"$/i, (msg) => {
    cy.get('#chat-feed').should('contain.text', msg);
})