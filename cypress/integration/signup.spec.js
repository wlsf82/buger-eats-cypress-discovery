/// <reference types="cypress" />
import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'

describe('Signup', () => {
    beforeEach(() => {
        // cy.fixture('deliver').then(d => deliver = d)
        signup.go()
    })

    it('User should be deliver', () => {
        let deliver = signupFactory.deliver()
        signup.fillForm(deliver)
        signup.submit()

        const expectedMessage = 'Recebemos os seus dados.'
        signup.modalContentShouldBe(expectedMessage)
    })

    it('Incorrect document', () => {
        let deliver = signupFactory.deliver()
        deliver.cpf = '123456789AB'
        signup.fillForm(deliver)
        signup.submit()

        signup.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', () => {
        let deliver = signupFactory.deliver()
        deliver.email = 'tiago.teste.com'
        signup.fillForm(deliver)
        signup.submit()

        signup.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('Required fields', () => {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        beforeEach(() => {
            signup.submit()
        })

        messages.forEach(message => {
            it(`${message.field} is required`, () => {
                signup.alertMessageShouldBe(message.output)
            })
        })
    })
})