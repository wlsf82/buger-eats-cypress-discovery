/// <reference types="cypress" />

describe('Homepage', () => {
  it('is alive', () => {
    cy.visit('/')

    cy.get('#page-home main h1')
      .should('have.text', 'Seja um parceiro entregador pela Buger Eats')
      .and('be.visible')
  })
})
