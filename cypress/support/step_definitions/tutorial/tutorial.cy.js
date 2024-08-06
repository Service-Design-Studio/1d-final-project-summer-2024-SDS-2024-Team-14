
Then('I click on the next button till the last slide', () => {
    const nextButtonSelector = '.next'; 
    for (let i = 0; i < 5; i++) {
        cy.get(nextButtonSelector).click();
    }
});