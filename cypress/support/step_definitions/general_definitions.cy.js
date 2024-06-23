import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(/^I am on the (.+) page$ /i, (page) => {
    cy.visit(page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(' ', '-')}`);
})