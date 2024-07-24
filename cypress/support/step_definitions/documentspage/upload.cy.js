import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";
import 'cypress-file-upload';

// Given(/^I have clicked to the (.+) page$/i, (page) => {
//     cy.visit(Cypress.config().baseUrl+'documents'+page.toLowerCase() === "documents" ? "/" : `/${page.toLowerCase().replace(' ', '/')}`);
// })
const apiUrl = '/document';

Given(/^I have clicked to the (.+) page$/i, (page) => {
    const baseUrl = Cypress.config().baseUrl;
    const uploadPageUrl = `${baseUrl}documents/upload`;

    cy.visit(uploadPageUrl);

    cy.url().should("eq", uploadPageUrl);
})

When('I add new files', () => {
    const fileName = 'example-file.pdf'; // Change to the path of your test PDF file
    cy.fixture(fileName, 'base64').then(fileContent => {
      const file = {
        fileContent,
        fileName,
        mimeType: 'application/pdf',
        encoding: 'base64'
      };
      cy.get('input[type="file"]').attachFile(file, { force: true })
    });
   // cy.get('input[type="file"]').should('be.visible').and('not.be.disabled');
});

Then('I should see previews of my uploaded files', () => {
    cy.get('img').should('be.visible'); // For image previews
    cy.get('iframe').should('be.visible'); // For PDF previews
});


When('I submit my documents by the upload button', () => {
  // Intercept the axios call before triggering the upload button
  cy.intercept('POST', apiUrl, (req) => {
    req.reply({
      statusCode: 200,
      fixture: 'example-file.pdf'
    });
  }).as('uploadFile');
  // Trigger the upload button click
  cy.get('#upload').click();
});

Then('I should then return to the documents page', ()=>{
  cy.url().should("eq",Cypress.config().baseUrl+"documents")
})

Then('I should be getting an error notification', ()=> {
  cy.get(".rnc__notification-message").contains("Please choose a category first before uploading")
})

 