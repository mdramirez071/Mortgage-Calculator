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
        //Checks if final Mortgage amount is correct
        cy.get(result => expect(result).to.contain('738.13', 'Expected mortgage payment didn\'t match'))
    })
})