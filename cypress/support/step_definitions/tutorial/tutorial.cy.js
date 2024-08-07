import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";


When(/^I click on the "(.+)" button$/i, (btn) => {
    cy.get(`.${btn}`).click();
})

Then ('as I am a first time user I should be redirected to the intro page',() =>{
    cy.window().then(window => {
        window.localStorage.setItem("userID", "firstTimeUser")
    })
    cy.intercept("POST", "/notifications/read/", {
        statusCode: 200,
        fixture: ""
    }).as("readNotifications")
    cy.visit("/intro")
})

Then('I click on the next button till the last slide', () => {
    const nextButtonSelector = '.next'; 
    cy.get(nextButtonSelector, { timeout: 10000 }).should('be.visible');
    for (let i = 0; i < 5; i++) {
        cy.get(nextButtonSelector).click();
    }
});


Then('I should see the correct tutorial content for {string}', (page) => {
    cy.viewport(1440, 900);
    cy.get('.tutorial-content-selector', { timeout: 10000 }).should('be.visible');

    const expectedContent = {
        '/': [
            { category: 'Display Card with QR Code', title: 'Display Card with QR Code' },
            { category: 'Access Our Services', title: 'Access Our Services' },
            { category: 'FAQ Chatbot', title: 'FAQ Chatbot' },
        ],
        '/documents': [
            { category: 'Document Management', title: 'Document Management' }, // Update as needed
        ],
        '/family-tree': [
            { category: 'Family Tree', title: 'Family Tree' }, // Update as needed
        ]
    };

    const content = expectedContent[page.toLowerCase()] || [];

    content.forEach((item, index) => {
        cy.get('.tutorial-content-selector')
            .eq(index)
            .should('contain', item.title);
    });
});

  
