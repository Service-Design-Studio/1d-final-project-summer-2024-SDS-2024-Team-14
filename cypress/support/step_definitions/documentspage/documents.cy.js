import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import "../general_definitions.cy.js"

Then("I should be directed to the Home page", () => {
    cy.url().should('eq', Cypress.config().baseUrl+'')
})

//Scenario 2: Adding Documents
When("I click on the plus button", ()=>{
    cy.get("#plus").click()
})

Then(/^I should (not )?see the following options in the pop-up menu:$/, (not, dataTable) => {
    dataTable.rawTable.slice(1).forEach((row) => {
      const option = row[0];
      if (not) {
        cy.contains(option).should('not.exist');
      } 
      else {
        cy.contains(option).should('exist');
      }
    });
  });

When("I click on the uploadfiles button", ()=>{
    cy.get("#uploadfiles").click()
})

Then("I should be directed to the Upload page", () => {
    cy.url().should('eq', Cypress.config().baseUrl+'')
})

When("I click on the scan button", ()=>{
    cy.get("#scan").click()
})

Then("I should be directed to the Scan page", () => {
    cy.url().should('eq', Cypress.config().baseUrl+'')
})

//Scenario 3: Accessing Documents in Folders
//this one i not sure, cus idt haowei used a dataTable or is the same thing as grid? and since it is structured left and right also then does that mean i need to slice to col also ?
Then('I should see Cards with the following title:', (dataTable) => {
    dataTable.rawTable.slice(1).forEach((row) => {
      const Title = row[0];
      cy.contains('div.Card', Title).should('be.visible');
    });
  });  

When('I click on the {string} card', (title) => {
    cy.contains('div.Card', title).click(); 
  });

//is this even allowed
Then('I should be navigated to the {string} page', (pageTitle) => {
    const pageUrlMapping = {
    'health': '/health',
    'career': '/career',
    'education': '/education',
    'family': '/family',
    'finance': '/finance',
    'property': '/property'
    
    };
    cy.url().should('eq', Cypress.config().baseUrl+(pageUrlMapping[pageTitle.toLowerCase()] || pageTitle.toLowerCase().replace(' ', '-')))
})