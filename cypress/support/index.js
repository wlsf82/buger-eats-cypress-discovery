Cypress.Commands.add('fillForm', consumer => {
  cy.get('input[name="fullName"]').type(consumer.name)
  cy.get('input[name="cpf"]').type(consumer.cpf)
  cy.get('input[name="email"]').type(consumer.email)
  cy.get('input[name="whatsapp"]').type(consumer.whatsapp)
  cy.get('input[name="postalcode"]').type(consumer.address.postalcode)
  cy.get('input[type="button"][value="Buscar CEP"]').click();
  cy.get('input[name="address-number"]').type(consumer.address.number)
  cy.get('input[name="address-details"]').type(consumer.address.details)

  cy.get('input[name="address"]').should('have.value', consumer.address.street)
  cy.get('input[name="district"]').should('have.value', consumer.address.district)
  cy.get('input[name="city-uf"]').should('have.value', consumer.address.city_state)

  cy.contains('.delivery-method li', 'Moto').click()
  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/spidermen.jpeg', { force: true })
})
