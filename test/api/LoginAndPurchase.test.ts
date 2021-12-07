import { get, post } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = 'http://localhost:8080'

describe('Login and Purchase API tests', () => {
    let token: string
    describe('when logging in', () => {

        describe('given a correct username and password combination', () => {
            const authBody = {
                username: 'gordon',
                password: 'gordonpassword'
            }
            it('should return the authentication token', async () => {
                const { status, body } = await post(`${baseUrl}/login/`).send(authBody)
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.have.property('token')
                token = body.token
            })
        })

        describe('given a bad username and password combination', () => {
            const unauthorizedBody = {
                username: 'gordon',
                password: 'badpassword'
            }
            it('should throw UNAUTHORIZED status', async () => {
                try {
                    await post(`${baseUrl}/login/`).send(unauthorizedBody)
                } catch (error) {
                    const { status } = error.response
                    expect(status).to.equal(StatusCodes.UNAUTHORIZED)
                }
            })
        })
    })

    describe('when purchasing', () => {
        const thankYouMessage = "Thank you for shopping @Sea! We're sending a confirmation email shortly and getting your order ready!"
        describe('given an authentication token', () => {
            it('should return a thank you message', async () => {
                const { status, body } = await get(`${baseUrl}/purchase/`).auth(token, { type: 'bearer' })
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.have.property('message', thankYouMessage)
            })
        })

        describe('not given an authentication token', () => {
            it('should throw UNAUTHORIZED status', async () => {
                try {
                    await get(`${baseUrl}/purchase/`)
                } catch (error) {
                    const { status } = error.response
                    expect(status).to.equal(StatusCodes.UNAUTHORIZED)
                }
            })
        })
    })
})
