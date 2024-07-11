import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js"
import { loginPage } from "../../utils"


When(/^I click on the \"submitBtn\" button - (.+)$/i, (scenario) => {
    if (scenario === "login success") {
        cy.intercept("POST", '/login', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'login_successful.json'
            })
        });
    }
    else if (scenario === "wrong password") {
        cy.intercept("POST", '/login', (req) => {
            req.reply({
                statusCode: 422,
                fixture: 'login_wrongpw.json'
            })
        });
    }
    else if (scenario === "invalid email") {
        cy.intercept("POST", '/login', (req) => {
            req.reply({
                statusCode: 422,
                fixture: 'login_wrongemail.json'
            })
        });
    }
    else if (scenario === "signup success") {
        cy.intercept("POST", '/users', (req) => {
            req.reply({
                statusCode: 200,
                fixture: 'signup_successful.json'
            })
        });
    }
    cy.get("#submitBtn").click()
})

Then("I should be notified of the wrong password", () => {
    loginPage.wrongPassword()
})

Then("I should be notified of the invalid email", () => {
    loginPage.invalidEmail()
})

