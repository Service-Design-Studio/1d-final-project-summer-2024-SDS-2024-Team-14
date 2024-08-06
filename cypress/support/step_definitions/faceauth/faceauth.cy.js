
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";

When('I add new photo', () => {
    const fileName = 'Abul_ahmed_rohingyaRefugee_persona 1.png'; // Change to the path of your test PDF file
    cy.fixture(fileName, 'base64').then(fileContent => {
      const file = {
        fileContent,
        fileName,
        mimeType: 'images/png',
        encoding: 'base64'
      };
      cy.get('input[type="file"]').attachFile(file, { force: true })
    });
  });

Then ('I show my face', () => {
    cy.intercept("POST","/authentication/verify",(res) => { 
        res.reply({
            statusCode: 200,
            body:{ matched: true }
        }).as("faceMatched")
        mount(<UploadScan />)
        cy.wait('@faceMatched');
    })
})

Then ('I should see a successful match ',()=>{
    cy.get('p.success').should('contain', 'Face verification is successful')
})


Then ('I did not show my face within 15s', () => {
    cy.wait(15000)
})