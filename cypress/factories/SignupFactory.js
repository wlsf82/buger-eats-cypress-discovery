import faker from 'faker'
let cpf = require('gerador-validador-cpf')

export default {
    deliver() {
        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()

        return {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName, lastName),
            whatsapp: "19999999999",
            address: {
                postalcode: "13476562",
                street: "Rua Irmã Dorothy Mae Stang",
                number: "1000",
                details: "Teste de software",
                district: "Loteamento Residencial de Interesse Social Vila Nova Esperança - ASTA 4",
                city_state: "Americana/SP"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpeg"
        }
    }
}