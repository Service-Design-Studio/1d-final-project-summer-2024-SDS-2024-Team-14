import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";
import 'cypress-file-upload';

const apiUrl = '/document';


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
  cy.intercept('POST',)
});

Then('I should then return to the documents page', ()=>{
  cy.url().should("eq",Cypress.config().baseUrl+"documents")
})

Then('I should be getting an error notification', ()=> {
  cy.get(".rnc__notification-message").contains("Please choose a category first before uploading")
})

 