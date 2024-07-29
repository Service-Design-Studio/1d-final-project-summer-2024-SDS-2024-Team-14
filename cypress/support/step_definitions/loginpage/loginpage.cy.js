import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js"
import { loginPage } from "../../utils"
const validEmail = "elliotphua@gmail.com"
const validPassword = "Password123"
When(/^I click on the "(login|signup)?" button$/i, (e1) => {
    let json_name = `${e1}_successful.json`;
    if (e1 == "login") {
        cy.get("#email").invoke("val").then(val => {
            if (val != validEmail) {
                json_name = 'login_wrongemail.json'
            } else {
                cy.get("#password").invoke("val").then(val => {
                    if (val != validPassword) {
                        json_name = "login_wrongpw.json"
                    }
                })
            }
        })
        cy.intercept("POST", '/login', (req) => {
            req.reply({
                statusCode: (json_name == "login_successful.json" ? 200 : 422),
                fixture: json_name
            })
        });
        cy.get(".login").click();

    } else if (e1 == "signup") {
        cy.intercept("POST", '/users', (req) => {
            req.reply({
                statusCode: (json_name == "signup_successful.json" ? 200 : 422),
                fixture: json_name
            })
        });
        cy.get(".signup").click();

    }
})

