describe('My First Test', () => {
    it('Gets, types and assets', () => {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
        // Should redirect to a new URL that includes '/commands/actions/'
        cy.url().should('include', '/commands/actions')
    })
})