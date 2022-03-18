import SessionController from "../../src/business/SessionsController.js";

const sessionsController = new SessionController('','','','','')

import assert from 'assert'


describe('# SessionsController',()=>{
    describe('# getCredentials',()=>{
        it('Caso recebido os valores de email e senha retorne duas variaveis email e senha',()=>{
            const fakeData = {
                email:'teste@teste.com',
                password:'1234'
            }
            
            const [actualemail,actualpassword] = sessionsController.getCredentials(fakeData)

            assert.strictEqual(actualemail,'teste@teste.com')
            assert.strictEqual(actualpassword,'1234')

            
        })
        it('Caso algum dos valores nao  for informado retore um erro com a mensagem "Missing Credentials" e o status 400',()=>{
            try {
                const fakeData = {
                    email:'teste@teste.com'
                }
                
                const actual = sessionsController.getCredentials(fakeData)
            } catch (error) {
                
                assert.strictEqual(error.message,'Missing Credentials')
                assert.strictEqual(error.status,400)
            }
        })
        

    })
})