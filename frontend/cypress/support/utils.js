import { BrowserMultiFormatReader } from "@zxing/browser";

class HomePage {
    elements = {
        idCard: () => cy.get(".id-card"),

    }

    clickCardButton() {
        cy.get("#idCardButton").click()
    }

    checkIdentificationNumber() {
        this.elements.idCard().get("#idcard-identify").should(($id) => {
            expect($id).not.to.contain('*')
        })
    }

    checkQrCodeExist() {
        cy.get('#id-card').should('exist')
    }

    checkQrCodeUrl() {
        const reader = new BrowserMultiFormatReader();
        this.elements.idCard().get('Canvas').then(($canvas) => {
            // $canvas is a jQuery-wrapped DOM element, get the raw DOM element
            const originalCanvas = $canvas[0];
            const fullUrl = reader.decodeFromCanvas(originalCanvas).getText();
            // Copy the content from the original canvas to the new canvas
            expect(fullUrl).to.equal("https://127.0.0.1:3000/info/1")
        })
    }

    returnQrCodeUrl() {
        const reader = new BrowserMultiFormatReader();
        return this.elements.idCard().get('canvas').then(($canvas) => {
            // $canvas is a jQuery-wrapped DOM element, get the raw DOM element
            const originalCanvas = $canvas[0];
            const fullUrl = reader.decodeFromCanvas(originalCanvas).getText();
            const url = new URL(fullUrl);
            const relativePart = url.pathname + url.search;
            console.log(relativePart);
            // Return the relative part wrapped in a Cypress chainable object
            return cy.wrap(relativePart);
        });
    }

    verified() {
        // intercept api call and return fixture
          cy.window().then((win) => {
            win.localStorage.setItem('userID', '1'); // Set user_id to mimic login
          });
          cy.intercept("GET", `/users/1`, (req) => {
            req.reply({
              statusCode: 200,
              fixture: 'userdetails_approved.json'
            })
          })
    }

    unverified() {
        cy.window().then((win) => {
            win.localStorage.setItem('userID', '1'); // Set user_id to mimic login
          });
          cy.intercept("GET", `/users/1`, (req) => {
            req.reply({
              statusCode: 200,
              fixture: 'userdetails_pending.json'
            })
          })
    }

    checkCardButton() {
        this.elements.idCard().get("#idCardButton").contains("Pending Approval")
    }

    checkQrCodeDoesNotExist() {
        this.elements.idCard().get('canvas').should('not.be.visible');
    }
}

class LoginPage {
    elements = {
        notificationMessage: () => cy.get(".rnc__notification-message"),
    }

    wrongPassword() {
        this.elements.notificationMessage().contains("make sure that your password is correct")
    }

    invalidEmail() {
        this.elements.notificationMessage().contains("email you have entered is invalid")
    }
}

export const homePage = new HomePage();
export const loginPage = new LoginPage();