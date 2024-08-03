import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";

// change to fixture in response reply
When(/^I have added a "(.+)-document"$/i, (e1) => {
    cy.intercept("POST", "/document/retrieve", (res) => { 
        res.reply({
            statusCode: 200,
            body: [{
                "id": 1,
                "name": "example-doc.pdf",
                "status": "Pending",
                "category": `${e1.charAt(0).toUpperCase() + e1.slice(1)}`,
            }]
,
        })
    }).as("retrieveDocuments")
    cy.visit("/documents")
})