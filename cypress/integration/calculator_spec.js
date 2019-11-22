describe('End-To-End Test for Mortgage Calculator', () => {
    it('Opens Calculator, Inputs Values, Runs Calculations', () => {
        cy.visit('http://localhost:3000')
        //Contains a button called "Submit"
        cy.contains('Submit')
        //Checks for Loan Balance, APR Rate, and Term elements
        cy.get('#loan-balance')
        .type('137500')
        cy.get('#APR-rate')
        .type('5')
        cy.get('#term')
        .select('30')

        //Clicks Submit button to Calculate Mortgage Amount
        cy.contains('Submit').click()
        //cy.evaluate(() => document.querySelector('#output').innerHTML)
        cy.get(result => expect(result).to.contain('738.13', 'Expected mortgage payment didn\'t match'))
        //cy.wait('#output')

        //Checks if Calculated Mortgage Amount is Correct
        //cy.get('#output').should('have.value', '738.13')
    })
})


// describe('My First Test', () => {
//     it('Gets, types and assets', () => {
//         cy.visit('https://example.cypress.io')

//         cy.contains('type').click()
//         // Should redirect to a new URL that includes '/commands/actions/'
//         cy.url().should('include', '/commands/actions')

//         //Get an input, type into it and verify that the value has been updated.
//         cy.get('.action-email')
//         .type('fake@email.com')
//         .should('have.value', 'fake@email.com')
//     })
// })