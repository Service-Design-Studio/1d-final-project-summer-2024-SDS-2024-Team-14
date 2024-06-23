import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(/^I am on the (.+) page$ /, (page) => {
    cy.visit(page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(' ', '-')}`);
})