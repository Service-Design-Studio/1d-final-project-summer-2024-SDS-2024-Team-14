import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("Cannot read properties of null (reading 'document')")) {
        return false;
    }
    throw err;
});

describe('Preserve localStorage in Cypress', () => {
    before(() => {
        localStorage.setItem("userID", 1);
        cy.saveLocalStorage();
    });
    beforeEach(() => {
        Cypress.env("newNotification", false)
        cy.loadLocalStorage();
    });

    it('should have preserved localStorage', () => {
        cy.visit('/');
        cy.window().then((window) => {
            expect(window.localStorage.getItem('userID')).to.exist;
        })
    })
})

Given(/^I am on the (.+) page$/i, (page) => {
    // cy.log("userID: ", localStorage.getItem("userID"))
    cy.window().then(window => {
        window.localStorage.setItem("userID", 2)
    })
    cy.intercept("POST", "/notifications/read/", {
        statusCode: 200,
        fixture: ""
    }).as("readNotifications")
    cy.visit(page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(/ /g, '/')}`);
})

// Change all previous features to use get by class rather than id
When(/^I click the "(.+)" button$/i, (btn) => {
    cy.get(`.${btn}`).click();
})

When(/^I fill in "(.+)" with "(.+)"$/i, (e1, e2) => {
    cy.get(`#${e1}`).type(e2);
})
When(/^I do not fill in "(.+)"$/i, (e1) => {
    cy.expect(`.${e1}`).to.contains("")
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
    cy.intercept("GET", "/users/*", (res) => { 
        res.reply({
            statusCode: 200,
            fixture: (status == "approved" ?"userdetails_approved.json" : "userdetails_pending.json")
        })
    } ).as("getUNHCRCard")
})
Then(/^I should (not )?see the message "(.+)"$/i, (not, msg) => {
    cy.on(window.alert, (txt) => {
        not ? expect(txt).to.not.contains(msg) : expect(txt).to.contains(msg);
    });
})

Then(/^I should (not )?see "(.+)"$/, (not, e2) => {
    not ? cy.get(`.${e2}`).should('not.exist') : cy.get(`.${e2}`).should('exist')
})

Then(/^I should (not )?see the text, "(.+)"$/, (not, msg) => {
    cy.get('body').should(`${not ? `not.` : ``}contain`, msg)
})

Then(/^I should (be redirected to|remain on) the (.+) page$/i, (e1, page) => {
    cy.url().should("eq", Cypress.config().baseUrl + (page.toLowerCase() === "home" ? "" : `${page.toLowerCase().replace(/ /g, '/')}`));
})

Then(/^I should (not )?be able to click "(.+)"$/, (not, element) => {
    cy.get(`.${element}`).should(not ? 'be.disabled' : 'not.be.disabled')
})
Then(/^I should see the "(.+)" has text "(.+)"$/i, (e1, s1) => {
    cy.get(`.${e1}`).should("contain", s1);
})