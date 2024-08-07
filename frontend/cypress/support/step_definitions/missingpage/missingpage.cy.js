import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js"

When(/^I am on "Missing Family & Friends" page$/i, () => {
    cy.window().then(window => {
        window.localStorage.setItem("userID", 1)
    })
    cy.intercept('GET', '/missing/1', {
        statusCode: 200,
        body: []
    }).as('missingPersonsInfo');
    cy.visit('/family-tree');
    cy.intercept('GET', '/match/1', (res) => {
        res.reply({
            statusCode: 200,
            fixture: 'no_matches.json'
        })
    })
})

When(/^I set birthdate to 8 April 2021$/, () => {
    cy.get('.birthdate').type('04-08-2021')
})

When(/^I click the (new||edit) form's save changes button$/, (e1) => {
    cy.intercept('POST', '/missing', {
        fixture: 'add_missing_person.json'
    }).as('addNewMissing')

    cy.intercept('GET', '/missing/photo/1', (res) => {
        res.reply({
            statusCode: 200,
            fixture: 'get_missing_no_photo.json'
        })
    })

    cy.intercept('POST', '/missing/update/', {
        fixture: 'updated_missing_person.json'
    }).as("addNewMissing")

    if (e1 == 'new') {
        cy.intercept('GET', '/missing/1', (res) => {
            res.reply({
                statusCode: 200,
                fixture: 'get_missing_persons.json'
            })
        }).as("getMissing")
    } else if (e1 == 'edit') {
        cy.intercept('GET', '/missing/1', (res) => {
            res.reply({
                statusCode: 200,
                fixture: 'updated_missing_person.json'
            })
        }).as("getMissing")
    }
    cy.get(".save_changes").click();
})
When(/^I click on the "delete" button$/, () => { 
    cy.intercept('POST', '/missing/delete', {
        fixture: 'delete_missing.json'
    })
    cy.intercept("GET", '/missing/1', res => {
        res.reply({
            statusCode: 200,
            fixture: 'no_matches.json'
        })
    }).as("getMissing");
    cy.get(".delete").click();
    cy.wait("@getMissing")
})