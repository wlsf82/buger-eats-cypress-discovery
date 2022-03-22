/// <reference types="cypress" />

describe('Registration of deliveryman', function() {
  beforeEach(function() {
    cy.visit('/deliver')
    cy.get('button[type="submit"]').as('submitButton')
    cy.task('deliverymanFactory').as('deliveryman')
  })

  it('successfully submits the form', function() {
    cy.fillForm(this.deliveryman)
    cy.get('@submitButton').click()

    cy.assertModalHasTextAndIsVisible('Recebemos os seus dados.')
  })

  context('Errors', function() {
    it('fails on invalid CPF', function() {
      this.deliveryman.cpf = '123456789AB'

      cy.fillForm(this.deliveryman)
      cy.get('@submitButton').click()

      cy.assertErrorMsgIsVisible('Oops! CPF inválido')
    })

    it('fails on invalid email format', function() {
      this.deliveryman.email = 'walmyr.filho.com'

      cy.fillForm(this.deliveryman)
      cy.get('@submitButton').click()

      cy.assertErrorMsgIsVisible('Oops! Email com formato inválido.')
    })

    it('shows messages for all required fields', function() {
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
        cy.assertErrorMsgIsVisible(message)
      })
    })
  })

  context('Use custom commands from different files', function() {
    it('foo', function() {
      cy.foo()
    })

    it('bar', function() {
      cy.bar()
    })

    it('baz', function() {
      cy.baz()
    })
  })
})
