import { get, post, put, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { OrderListSchema, OrderSchema, OrderUpdateSchema } from 'src/schema/Order.schema'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = 'http://localhost:8080/api'

describe('Order API tests', () => {
    let orderId: number

    describe('when creating an order', () => {
        const orderBody = {
            orderId: 1,
            customerId: 54321,
            productsOrdered: { "1": 1, "2": 1, "3": 1 }
        }

        it('should return the id of the created order', async () => {
            const { status, body } = await post(`${baseUrl}/order/`).send(orderBody)
            expect(status).to.equal(StatusCodes.CREATED)
            expect(body).to.have.property('orderId')
            orderId = body.orderId
        })

        it('should throw CONFLICT status if the id is already in use', async () => {
            try {
                await post(`${baseUrl}/order/`).send(orderBody)
            } catch (error) {
                const { status } = error.response
                expect(status).to.equal(StatusCodes.CONFLICT)
            }
        })
    })

    describe('when getting all orders /api/order/', () => {
        it('should return orders or throw NOT_FOUND status if there are none', async () => {
            try {
                const { status, body } = await get(`${baseUrl}/order/`)
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.be.jsonSchema(OrderListSchema)
            } catch (error) {
                const { status } = error.response
                expect(status).to.equal(StatusCodes.NOT_FOUND)
            }
        })
    })

    describe('when getting an order /api/order/:id', () => {
        const notFoundOrderId = 0

        it(`should return an order with id ${orderId}`, async () => {
            const { status, body } = await get(`${baseUrl}/order/${orderId}`)
            expect(status).to.equal(StatusCodes.OK)
            expect(body).to.be.jsonSchema(OrderSchema)
        })

        it('should throw NOT_FOUND status if the order does not exist', async () => {
            try {
                await get(`${baseUrl}/order/${notFoundOrderId}`)
            } catch (error) {
                const { status } = error.response
                expect(status).to.equal(StatusCodes.NOT_FOUND)
            }
        })
    })

    describe('when updating an order /api/order/:id', () => {
        const notFoundOrderId = 0
        const modifiedOrderBody = {
            orderId: 1,
            orderDate: 1488311559000,
            customerId: 101010,
            productsOrdered: { "1": 1, "2": 1 }
        }

        it('should return the modified order', async () => {
            const { status, body } = await put(`${baseUrl}/order/${orderId}`).send(modifiedOrderBody)
            expect(status).to.equal(StatusCodes.OK)
            expect(body).to.be.jsonSchema(OrderUpdateSchema)
            expect(body.orderDate).to.equal(modifiedOrderBody.orderDate)
            expect(body.customerId).to.equal(modifiedOrderBody.customerId)
            expect(body.productsOrdered).to.deep.equal(modifiedOrderBody.productsOrdered)
        })

        it('should throw NOT_FOUND status if the order does not exist', async () => {
            try {
                await put(`${baseUrl}/order/${notFoundOrderId}`).send(modifiedOrderBody)
            } catch (error) {
                const { status } = error.response
                expect(status).to.equal(StatusCodes.NOT_FOUND)
            }
        })
    })

    describe('when deleting an order /api/order/:id', () => {

        it('should return NO_CONTENT status', async () => {
            const { status } = await del(`${baseUrl}/order/${orderId}`)
            expect(status).to.equal(StatusCodes.NO_CONTENT)
        })

        it('should not find the deleted order', async () => {
            try {
                await get(`${baseUrl}/order/${orderId}`)
            } catch (error) {
                const { status } = error.response
                expect(status).to.equal(StatusCodes.NOT_FOUND)
            }
        })
    })
})
