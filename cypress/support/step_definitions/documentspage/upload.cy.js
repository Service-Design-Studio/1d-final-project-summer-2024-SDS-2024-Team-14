import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js";
import 'cypress-file-upload';

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
    cy.get('body').then(($body) => {
        if ($body.find('.MuiBackdrop-root').length) {
            cy.get('.MuiBackdrop-root').click(); 
        }
    });
})

Then('I should be able to add new files', () => {
    const fileName = 'example-file.png'
    cy.fixture(fileName).then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName,
          mimeType: 'image/png' // Adjust the mime type according to your test file
        });
      });
    cy.get('input[type="file"]').should('be.visible').and('not.be.disabled');
  });

  Then('I should see previews of my uploaded files', () => {
    cy.get('img').should('be.visible'); // For image previews
    cy.get('iframe').should('be.visible'); // For PDF previews
  });