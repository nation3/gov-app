describe('Proposals', () => {
  it('Should load /proposals list', () => {
    cy.visit('/proposals')
    cy.get('body').find('#proposalsPage')
  })

  it('Should open a random proposal page', () => {
    cy.visit('/proposals')
    cy.get('body')
      .find('.proposalCard')
      .then(proposalCards => {
        const proposalCardCount: number = Cypress.$(proposalCards).length
        cy.log('proposalCardCount:', proposalCardCount)
        const randomProposalCardIndex: number = Math.round((Math.random() * proposalCardCount))
        cy.log('randomProposalCardIndex:', randomProposalCardIndex)
        cy.get(`.proposalCard:nth-child(${randomProposalCardIndex + 1})`).click()
        cy.get('body').find('#proposalPage')
      })
  })

  it('Should filter by outcome and open a random proposal page', () => {
    cy.visit('/proposals')
    cy.get('#outcomeSelector')
      .find('option')
      .then(options => {
        // Select a random outome option
        const optionsCount: number = Cypress.$(options).length
        cy.log('optionsCount:', optionsCount)
        const randomOptionIndex: number = 1 + Math.floor((Math.random() * (optionsCount - 1)))
        cy.log('randomOptionIndex:', randomOptionIndex)
        const randomOptionValue: string = options[randomOptionIndex].value
        cy.log('randomOptionValue:', randomOptionValue)
        const randomOptionText: string = options[randomOptionIndex].text
        cy.log('randomOptionText:', randomOptionText)
        cy.get('#outcomeSelector').select(randomOptionValue)

        // Open a random proposal page
        cy.get('body')
          .find('.proposalCard')
          .then(proposalCards => {
            const proposalCardCount: number = Cypress.$(proposalCards).length
            cy.log('proposalCardCount:', proposalCardCount)
            const randomProposalCardIndex: number = Math.floor((Math.random() * proposalCardCount))
            cy.log('randomProposalCardIndex:', randomProposalCardIndex)
            cy.get(`.proposalCard:nth-child(${randomProposalCardIndex + 1})`).click()
            cy.get('body').find('#proposalPage')
            cy.get('.proposalBadges').contains(randomOptionText)
          })
      })
  })
})

describe('Create Proposal', () => {
  it('Should load /proposals/create', () => {
    cy.visit('/proposals')
    cy.get('#createButton').click()
    cy.get('body').find('#createPage')
  })

  it('Should load /proposals/process', () => {
    cy.visit('/proposals')
    cy.get('#createButton').click()
    cy.get('#governanceProcessLink').click()
    cy.get('body').find('#processPage')
  })
})

export {}
