class HomePage {
    elements = {
        idCard: () => cy.get(".id-card"),
    }
    clickCardButton(){
        this.elements.idCard().get("#idCardButton").click();
    }
    checkIdentificationNumber(){
        this.elements.idCard().get("#idCard-identify").should(($id) => {
            expect($id).not.to.contain('*')
        })
    }
    checkQrCode(){
        const qrCode = this.elements.idCard().get('#qr')
        // I need to process this qrcode
    }

}

export const homePage = new HomePage()