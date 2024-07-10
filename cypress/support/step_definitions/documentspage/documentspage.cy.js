import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import DocumentPage from '../path/to/DocumentPage';
import "../general_definitions.cy.js";
import { documentPage } from "../../utils";

const documentPage = new DocumentPage

When('I click the plus button', () => {
    cy.get(`#plus`).click(); 
});

Then('I should see popupmenu', () => {
    documentPage.elements.popupmenu().should('be.visible');
});

When('I click the files button', () => {
    cy.get('#files').click();
});

Then('I should be redirected to the Upload page',() => {
    cy.url().should('eq', Cypress.config().baseUrl+'documents'+(page.toLowerCase() === "documents" ? "" : `${pagetoLowerCase().replace(' ', '-')}`));
})

When('I click on the dropdown menu', () =>{
    cy.get('#dropdownmenu').click()
})