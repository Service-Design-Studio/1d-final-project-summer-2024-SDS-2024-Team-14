import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";
import { documentPage } from "../../utils";

When(/^I have added a "(.+)-document"$/i, (e1) => {
    cy.intercept("POST", "/document/retrieve", (res) => { 
        res.reply({
            statusCode: 200,
            fixture: {
                id: 1,
                name: `example-${e1}.pdf`,
                status: "Pending"
            },
        })
    }).as("retrieveDocuments")
    cy.visit("/documents")
})