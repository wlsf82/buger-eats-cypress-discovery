Cypress.Commands.add('fillForm', deliveryman => {
  cy.get('input[name="fullName"]').type(deliveryman.name)
  cy.get('input[name="cpf"]').type(deliveryman.cpf)
  cy.get('input[name="email"]').type(deliveryman.email)
  cy.get('input[name="whatsapp"]').type(deliveryman.whatsapp)
  cy.get('input[name="postalcode"]').type(deliveryman.address.postalcode)
  cy.get('input[type="button"][value="Buscar CEP"]').click();
  cy.get('input[name="address-number"]').type(deliveryman.address.number)
  cy.get('input[name="address-details"]').type(deliveryman.address.details)

  cy.get('input[name="address"]').should('have.value', deliveryman.address.street)
  cy.get('input[name="district"]').should('have.value', deliveryman.address.district)
  cy.get('input[name="city-uf"]').should('have.value', deliveryman.address.city_state)

  cy.contains('.delivery-method li', 'Moto').click()
  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/driver-license.png', { force: true })
})

Cypress.Commands.add('assertModalHasTextAndIsVisible', text => {
  cy.get('.swal2-container .swal2-icon-success')
    .should('include.text', text)
    .and('be.visible')
})

Cypress.Commands.add('assertErrorMsgIsVisible', message => {
  cy.contains('.alert-error', message)
    .should('be.visible')
})
