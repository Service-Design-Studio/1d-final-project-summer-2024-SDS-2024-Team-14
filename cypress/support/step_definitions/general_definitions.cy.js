import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore the specific error message
    if (err.message.includes("Cannot read properties of null (reading 'document')")) {
        return false;
    }

    // If the error message does not match, throw the error
    throw err;
});

describe('Preserve localStorage in Cypress', () => {
    before(() => {
        cy.visit('/login');
        cy.get('#email').type('elliotphua@gmail.com');
        cy.get('#password').type('Password123');
        cy.get('.submit').click();
        // cy.window().then((win) => {
        //     win.localStorage.setItem('userID', '1'); // Set user_id to mimic login
        // });
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        Cypress.env("newNotification", false)
        cy.loadLocalStorage();
        // cy.window().then((win) => {
        //     win.localStorage.setItem('userID', '1'); // Set user_id to mimic login
        // });
    });

    it('should have preserved localStorage', () => {
        cy.visit('/');
        cy.window().then((window) => {
            expect(window.localStorage.getItem('userID')).to.exist;
        })
    })
})

Given(/^I am on the (.+) page$/i, (page) => {
    cy.window().then(window => {
        window.localStorage.setItem("userID", 2)
    })
    const url = page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(/ /g, '/')}`;
    cy.visit(url);
})

// Change all previous features to use get by class rather than id
When(/^I click the "(.+)" button$/i, (btn) => {
    cy.get(`.${btn}`).click();
})

When(/^I fill in "(.+)" with "(.+)"$/i, (e1, e2) => {
    cy.get(`#${e1}`).type(e2);
})

When(/^I do not fill in "(.+)"$/i, (e1) => {
    cy.get(`#${e1}`).should('have.value', '');
})
When(/^my document is (.+)$/i, (status) => {
    cy.intercept("GET", "/notifications/*", {
        statusCode: 200,
        fixture: `${status}_doc.json`
    })
})
When(/^my refugee status is (.+)$/i, (status) => { 
    cy.intercept("GET", "/notifications/*", {
        statusCode: 200,
        fixture: `refugee_status_${status}`
    })
})
Then(/^I should (not )?see the message "(.+)"$/i, (not, msg) => {
    cy.on(window.alert, (txt) => {
        not ? expect(txt).to.not.contains(msg) : expect(txt).to.contains(msg);
    });
})

Then(/^I should (not )?see "(.+)"$/, (not, e2) => {
    not ? cy.get(`.${e2}`).should('not.exist') : cy.get(`.${e2}`).should('exist')
    if (!not && (e2 == "new_notification_icon" || e2 == "notification_icon")) {

    }
})

Then(/^I should (not )?see the text, "(.+)"$/, (not, msg) => {
    cy.get('body').should(`${not? `not.`:``}contain`, msg)
})

Then(/^I should (be redirected to|remain on) the (.+) page$/i, (e1, page) => {
    cy.url().should("eq", Cypress.config().baseUrl + (page.toLowerCase() === "home" ? "" : `${page.toLowerCase().replace(/ /g, '/')}`));
})

Then(/^I should (not )?see the "(.+)" element$/, (not, element) => {
    if (not) {
        cy.get(`#${element}`).should('not.exist');
    } else {
        cy.get(`#${element}`).should('exist');
    }
});

Then(/^I should (not )?be able to click "(.+)"$/, (not, element) => {
    cy.get(`.${element}`).should(not ? 'be.disabled' : 'not.be.disabled')
})