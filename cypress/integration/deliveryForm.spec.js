/// <reference types="cypress" />

describe('Delivery', () => {
  beforeEach(() => {
    cy.visit('/deliver')
    cy.get('#page-deliver form h1')
      .should('have.text', 'Cadastre-se para  fazer entregas')
    cy.get('form button[type="submit"]').as('submitButton')
  })

  it('successfully submits a delivery form', () => {
    cy.task('consumerFactory').then(consumer => {
      cy.fillForm(consumer)
      cy.get('@submitButton').click()

      cy.get('.swal2-container .swal2-icon-success')
        .should('include.text', 'Recebemos os seus dados.')
        .and('be.visible')
    })
  })

  context('Errors', () => {
    const alertErrorSelector = '.alert-error'

    it('fails on invalid CPF', () => {
      cy.task('consumerFactory').then(consumer => {
        consumer.cpf = '123456789AB'

        cy.fillForm(consumer)
        cy.get('@submitButton').click()

        cy.contains(alertErrorSelector, 'Oops! CPF inválido')
          .should('be.visible')
      })
    })

    it('fails on invalid email format', () => {
      cy.task('consumerFactory').then(consumer => {
        consumer.email = 'walmyr.filho.com'

        cy.fillForm(consumer)
        cy.get('@submitButton').click()

        cy.contains(alertErrorSelector, 'Oops! Email com formato inválido.')
          .should('be.visible')
      })
    })

    it('shows messages for all required fields', () => {
      const errorMessages = [
        'É necessário informar o nome',
        'É necessário informar o CPF',
        'É necessário informar o email',
        'É necessário informar o CEP',
        'É necessário informar o número do endereço',
        'Selecione o método de entrega',
        'Adicione uma foto da sua CNH'
      ]

      cy.get('@submitButton').click()

      errorMessages.forEach(message => {
        cy.contains(alertErrorSelector, message).should('be.visible')
      })
    })
  })
})
