import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../general_definitions.cy.js";

// change to fixture in response reply
When(/^I have added a "(.+)-document"$/i, (e1) => {
    cy.intercept("POST", "/document/retrieve", (res) => { 
        res.reply({
            statusCode: 200,
            body: [{
                "id": 1,
                "name": "example-doc.pdf",
                "status": "Pending",
                "category": `${e1.charAt(0).toUpperCase() + e1.slice(1)}`,
                "lastModifiedDate": '7 August 2024',
                "file_url": "http://localhost:3001/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MzIsInB1ciI6ImJsb2JfaWQifX0=--44d472d6e9a76ef0671572f7d09f2d260b0aa2f9/resume%202.png",
                "important": "{\n\"name\": \"Bosola Ronke\",\n\"title\": \"Product Designer\",\n\"email\": \"bosolaronke@example.com\",\n\"phone\": \"+234-70656209172\",\n\"linkedin\": \"behance.net/ronkebosola\",\n\"twitter\": \"twitter.com/ronkebosola\",\n\"website\": \"https:/ronkebosola.com\",\n\"experience\": [\n    {\n        \"company\": \"Bethany Services\",\n        \"location\": \"Grand Rapids, MI\",\n        \"title\": \"Product Designer\",\n        \"years\": \"2015-2016\"\n    },\n    {\n        \"company\": \"Bethany Services\",\n        \"location\": \"Grand Rapids, MI\",\n        \"title\": \"SR. HR CONSULTANT\",\n        \"years\": \"2017-2019\"\n    },\n    {\n        \"company\": \"Bethany Services\",\n        \"location\": \"Grand Rapids, MI\",\n        \"title\": \"HR DIRECTOR\",\n        \"years\": \"2019-2020\"\n    },\n    {\n        \"company\": \"Bethany Services\",\n        \"location\": \"Grand Rapids, MI\",\n        \"title\": \"Product Designer\",\n        \"years\": \"2015-2016\"\n    }\n],\n\"education\": [\n    {\n        \"institution\": \"VNU University of Engineering and Technology\",\n        \"degree\": \"Undergraduate\",\n        \"field\": \"Information Technology\",\n        \"years\": \"2015-2019\"\n    }\n],\n\"skills\": [\n    \"FIGMA\",\n    \"PHOTOSHOP\",\n    \"PRINTER\",\n    \"INDESIGN\",\n    \"Ms-WORD\"\n],\n\"hobbies\": [\n    \"Travel\",\n    \"Cycling\",\n    \"Gaming\",\n    \"Basketball\",\n    \"Photography\"\n],\n\"reference\": {\n    \"name\": \"MR. JOINE SMITH\",\n    \"title\": \"CEO\",\n    \"company\": \"ABC Company\",\n    \"phone\": \"+1 999 888 666\",\n    \"email\": \"joinsm@gmail.com\"\n}\n}",
            }]
        })
    }).as("retrieveDocuments")
    // cy.intercept("GET", "http://localhost:3001/rails/active_storage/blobs/redirect/**", {
    //     statusCode: 200,
    //     body: "Mock file content for popup",
    //     headers: {
    //         "content-type": "text/plain"
    //     }
    // }).as("getFileContent")
})

Then(/^I should see "(.+)-document"$/i, (e1) => {

})