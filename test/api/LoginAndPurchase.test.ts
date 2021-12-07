import { del, get, post } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import { Customer } from 'src/model/Customer'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = 'http://localhost:8080'

describe('Login and Purchase API tests', () => {
    let token: string
    let customerId: number
    before(async () => {
        const customerBody: Customer = {
            customerId: 0,
            name: "Sally Vallery",
            address: "144 Townsend, San Francisco 99999",
            email: "sally@example.com",
            phone: "513 222 5555",
            username: "gordon",
            password: "gordonpass",
            enabled: true,
            role: "USER"
        }
        const { body } = await post(`${baseUrl}/api/customer/`).send(customerBody)
        customerId = body.customerId
    })

    after(async () => {
        await del(`${baseUrl}/api/customer/${customerId}`)
    })
    describe('when logging in', () => {
        describe('given a correct username and password combination', () => {
            const authBody = {
                username: 'gordon',
                password: 'gordonpass'
            }
            it('should return the authentication token', async () => {
                const { status, body } = await post(`${baseUrl}/login/`).send(authBody)
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.have.property('token')
                token = body.token
            })
        })

        describe('given a bad username', () => {
            const unauthorizedBody = {
                username: 'badusername',
                password: 'gordonpass'
            }
            it('should throw NOT_FOUND status', async () => {
                try {
                    await post(`${baseUrl}/login/`).send(unauthorizedBody)
                } catch (error) {
                    const { status } = error.response
                    expect(status).to.equal(StatusCodes.NOT_FOUND)
                }
            })
        })

        describe('given a bad password', () => {
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
            const errorMessage = 'Missing or invalid Authorization header.'
            it('should throw INTERNAL_SERVER_ERROR status', async () => {
                try {
                    await get(`${baseUrl}/purchase/`)
                } catch (error) {
                    const { status, body } = error.response
                    expect(status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
                    expect(body.message).to.equal(errorMessage)
                }
            })
        })
    })
})
