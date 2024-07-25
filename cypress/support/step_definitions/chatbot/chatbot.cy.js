import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When(/^I type - (.+)$/i, (scenario) => {
  if (scenario === "my query on how do I upload my documents"){
    cy.get('#Input').type("How do I upload my documents");
  }

  else if (scenario === "gibberish"){
    cy.get(`#Input`).type("qwert");
  }

  else if (scenario === "a query that is unable to be answered by the chatbot"){
    cy.get(`#Input`).type("Where is Tony?");
  }

  else if (scenario === "my query on how do I upload my documents in Burmese"){
    cy.get(`#Input`).type("ကျွန်ုပ်၏စာရွက်စာတမ်းများကို မည်သို့တင်ရမည်နည်း။");
  }

})

When('I press the enter key', () => {
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot1.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('I accidentally press the enter key', () => {
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot2.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('I press enter', () => {
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot3.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});

When('I press enter to send my query to the chatbot', () => {
    cy.intercept('POST', '/chatbot', (req) => {
      req.reply({
        statusCode: 200,
        fixture: 'chatbot4.json'
      });
    }).as('chatbot');

    cy.get('#Input').type('{enter}');
});


Then(/^I should see a reply "(.+)"$/i, (scenario) => {
  if (scenario === "with instructions to upload my documents"){
    cy.get('#chat-feed').should('contain.text', "To upload your documents, click on the Document Manager button on the navigation bar at the top of the page. Choose your category and then click the upload or scan button at the top right of the screen. You can then choose the files or scan your files with the device camera. Thank you.");
  }

  else if (scenario === "asking for further clarification"){
    cy.get('#chat-feed').should('contain.text', "I'm sorry, I don't understand. Could you please rephrase your question?");
  }

  else if (scenario === "redirecting me to other contacts"){
    cy.get('#chat-feed').should('contain.text', "I'm sorry, I cannot answer that question. Please click the Community link above to contact us if you would like more assistance.");
  }

  else if (scenario === "with instructions on how to upload my documents in Burmese"){
    cy.get('#chat-feed').should('contain.text', "သင့်စာရွက်စာတမ်းများကို အပ်လုဒ်လုပ်ရန်၊ စာမျက်နှာ၏ထိပ်ရှိ လမ်းညွှန်ဘားပေါ်ရှိ စာရွက်စာတမ်းမန်နေဂျာခလုတ်ကို နှိပ်ပါ။ သင့်အမျိုးအစားကို ရွေးချယ်ပြီးနောက် မျက်နှာပြင်၏ ညာဘက်အပေါ်ရှိ အပ်လုဒ်လုပ်ခြင်း သို့မဟုတ် စကင်န်ဖတ်ခြင်းခလုတ်ကို နှိပ်ပါ။ ထို့နောက် သင်သည် ဖိုင်များကို ရွေးချယ်နိုင်သည် သို့မဟုတ် သင့်ဖိုင်များကို စက်ကင်မရာဖြင့် စကင်န်ဖတ်နိုင်သည်။ ကျေးဇူးတင်ပါသည်။");
  }
})

