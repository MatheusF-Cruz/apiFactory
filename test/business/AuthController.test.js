import AuthController from '../../src/business/AuthController.js';

const authController = new AuthController('','','','')

import assert from 'assert'


describe('# AuthController', ()=> {
    describe('# getToken', ()=> {
        it('Caso receba um Token armazene em uma variável e retorne', ()=>{
            const fakeData = 'Bearer a6s5d4asds84das1dasd165'
            const authHeader = authController.getToken(fakeData)

            assert.strictEqual(authHeader, fakeData)
        })
        it('Caso não tenha um Token retorne um erro "Missing Token" e status 400', ()=> {
            try {
                const fakeData = undefined

                const authHeader = authController.getToken(fakeData)
            } catch (error) {
                assert.strictEqual(error.message, 'Missing Token')
                assert.strictEqual(error.status, 400)
            }
        })
    })
})