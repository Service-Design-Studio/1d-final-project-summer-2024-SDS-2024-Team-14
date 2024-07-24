import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-localstorage-commands";
Given(/^I am on the (.+) page$/i, (page) => {
    cy.visit(page.toLowerCase() === "home" ? "/" : `/${page.toLowerCase().replace(/ /g, '/')}`);
})


// When(/^I click the "(.+)" button$/i, (btn) => {
//     cy.get(`#${btn}`).click();
// })


When(/^I click the "(.+)" button$/i, (btn) => {
    cy.restoreLocalStorage();
    cy.get(`.${btn}`).click();
    cy.saveLocalStorage();
})

When(/^I fill in "(.+)" with "(.+)"$/i, (e1, e2) => {
    cy.get(`#${e1}`).type(e2);
})

When(/^I do not fill in "(.+)"$/i, (e1) => {
    cy.get(`#${e1}`).should('have.value', '');
})

Then(/^I should (not )?see the message "(.+)"$/i, (not, msg) => {
    cy.on(window.alert, (txt) => {
        not ? expect(txt).to.not.contains(msg) : expect(txt).to.contains(msg);
    });
})

Then(/^I should (not )?see "(.+)"$/, (not, e2) => {
    not ? cy.get(`.${e2}`).should('not.exist') : cy.get(`.${e2}`).should('exist')
    if (!not && (e2 == "new_notification_icon" || e2 == "notification_icon")) {
        cy.intercept('GET', '/notifications', (req) => {
            cy.wait(this.uploadFile).then(inttercept => { 
                req.reply({
                    statusCode: 200,
                    fixture: {
                        id: 1,
                        category: "Upload Success",
                        content: "Your education document: example-file.pdf has been uploaded successfully.",
                        created_at: new Date(),
                        read: false
                    }
                }).as('newNotification')
            })
        })
    }
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