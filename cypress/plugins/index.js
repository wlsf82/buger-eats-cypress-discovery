/**
 * @type {Cypress.PluginConfig}
 */

const { generate } = require('gerador-validador-cpf')

module.exports = (on, config) => {
  on('task', {
    consumerFactory() {
      const firstName = 'Walmyr'
      const lastName = 'Filho'

      return {
        name: `${firstName} ${lastName}`,
        cpf: generate(),
        email: `${firstName.toLowerCase()}${lastName.toLowerCase()}@example.com`,
        whatsapp: '19999999999',
        address: {
          postalcode: '13476562',
          street: 'Rua Irmã Dorothy Mae Stang',
          number: '1000',
          details: 'Teste de software',
          district: 'Loteamento Residencial de Interesse Social Vila Nova Esperança - ASTA 4',
          city_state: 'Americana/SP'
        }
      }
    }
  })

  return config
}
