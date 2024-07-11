import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(/^I am on the (.+) page$/i, (page) => {
    cy.visit(page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(' ', '-')}`);
})

When(/^I click the "(.+)" button$/i, (btn) => {
    cy.get(`#${btn}`).click();
})

When(/^I fill in "(.+)" with "(.+)"$/i, (e1, e2) => {
    cy.get(`#${e1}`).type(e2);
})

When(/^I do not fill in "(.+)"$/i, (e1) => {
    cy.get(`#${e1}`).should('have.value','');
})

Then(/^I should (not )?see the message "(.+)"$/i, (not, msg) => {
    cy.on(window.alert, (txt) => {
        not ? expect(txt).to.not.contains(msg) : expect(txt).to.contains(msg);
    });
})

// Then(/^I should (not )?see "(.+)"$/, (not, e2) => {
//     not ? expect().to.not.contains(e2): expect().to.contains(e2);
// })

Then(/^I should (be redirected to|remain on) the (.+) page$/i, (e1, page) => {
    cy.url().should("eq", Cypress.config().baseUrl + (page.toLowerCase() === "home" ? "" : `${page.toLowerCase().replace(' ', '/')}`));
})

Then(/^I should (not )?see the "(.+)" element$/, (not, element) => {
    if (not) {
      cy.get(`#${element}`).should('not.exist');
    } else {
      cy.get(`#${element}`).should('exist');
    }
  });