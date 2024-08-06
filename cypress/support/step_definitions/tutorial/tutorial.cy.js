import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";

Then('I click on the next button till the last slide', () => {
    const nextButtonSelector = 'next'; 
    cy.get(nextButtonSelector, { timeout: 10000 }).should('be.visible');
    for (let i = 0; i < 5; i++) {
        cy.get(nextButtonSelector).click();
    }
});