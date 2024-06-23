import { BrowserMultiFormatReader } from "@zxing/browser";

class HomePage {
    elements = {
        idCard: () => cy.get(".id-card"),

    }

    clickCardButton() {
        this.elements.idCard().get("#idCardButton").click()
    }

    checkIdentificationNumber() {
        this.elements.idCard().get("#idcard-identify").should(($id) => {
            expect($id).not.to.contain('*')
        })
    }

    checkQrCodeExist() {
        this.elements.idCard().get('canvas').should('exist');
    }

    checkQrCodeUrl() {
        const reader = new BrowserMultiFormatReader();
        this.elements.idCard().get('canvas').then(($canvas) => {
            // $canvas is a jQuery-wrapped DOM element, get the raw DOM element
            const originalCanvas = $canvas[0];

            // Copy the content from the original canvas to the new canvas
            expect(reader.decodeFromCanvas(originalCanvas).getText()).to.equal(
                'https://gebirah-aid-2r6b52gguq-as.a.run.app/info/1')
        })
    }

    returnQrCodeUrl() {
        const reader = new BrowserMultiFormatReader();
        return this.elements.idCard().get('canvas').then(($canvas) => {
            // $canvas is a jQuery-wrapped DOM element, get the raw DOM element
            const originalCanvas = $canvas[0];
            const fullUrl = reader.decodeFromCanvas(originalCanvas).getText();
            const url = new URL(fullUrl);
            console.log(url);
            const relativePart = url.pathname + url.search;
            console.log(relativePart);
            // Return the relative part wrapped in a Cypress chainable object
            return cy.wrap(relativePart);
        });
    }
}

class LoginPage {
}
export const homePage = new HomePage();
export const loginPage = new LoginPage();