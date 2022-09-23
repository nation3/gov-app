describe('Proposals', () => {

  it('Should load /proposals page', () => {
    cy.visit('/proposals')
    cy.get('h1').contains('Proposals')
  })
})

export {}
