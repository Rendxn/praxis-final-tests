import { get, post, put, del } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { Customer } from 'src/model/Customer'
import CustomerSchema from 'src/schema/Customer.schema'
import environment from 'config/environment'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = `${environment.API_BASE_URL}/api`

describe('Customer API tests', () => {
  const customerName = 'Test'
  const customerUsername = 'test'
  let customerId

  describe('when creating a new customer', () => {
    const createCustomerBody: Customer = {
      customerId: 0,
      name: customerName,
      address: 'Test address',
      email: 'test@user.com',
      phone: '300 000 0000',
      username: customerUsername,
      password: 'test',
      enabled: true,
      role: 'USER',
    }

    it('should create a new customer', async () => {
      const { status, body } = await post(`${baseUrl}/customer/`).send(
        createCustomerBody
      )

      expect(status).to.equal(StatusCodes.CREATED)
      expect(body).to.have.property('customerId')

      customerId = body.customerId
    })

    it('should throw an error if username already exists', async () => {
      try {
        await post(`${baseUrl}/customer/`).send(createCustomerBody)
      } catch (error) {
        expect(error.response?.status).to.equal(StatusCodes.CONFLICT)
      }
    })
  })

  describe('when getting a customer', () => {
    describe('by id', () => {
      it('should return a customer', async () => {
        const { status, body } = await get(`${baseUrl}/customer/${customerId}`)

        expect(status).to.equal(StatusCodes.OK)
        expect(body).to.be.jsonSchema(CustomerSchema)
      })

      it('should throw error if customer does not exist', async () => {
        try {
          await get(`${baseUrl}/customer/1000000`)
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        }
      })
    })

    describe('by name', () => {
      it('should return a customer', async () => {
        const { status, body } = await get(
          `${baseUrl}/customer/name=${customerName}`
        )

        expect(status).to.equal(StatusCodes.OK)
        expect(body).to.be.jsonSchema(CustomerSchema)
      })

      it('should throw error if customer does not exist', async () => {
        try {
          await get(`${baseUrl}/customer/name=namedoesnotexist`)
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        }
      })
    })

    describe('by username', () => {
      it('should return a customer', async () => {
        const { status, body } = await get(
          `${baseUrl}/customer/username=${customerUsername}`
        )

        expect(status).to.equal(StatusCodes.OK)
        expect(body).to.be.jsonSchema(CustomerSchema)
      })

      it('should throw error if customer does not exist', async () => {
        try {
          await get(`${baseUrl}/customer/username=usernamedoesnotexist`)
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        }
      })
    })
  })

  describe('when updating customer', () => {
    const updateCustomerBody: Customer = {
      customerId: 0,
      name: 'Test',
      address: 'Updated test address',
      email: 'test@user.com',
      phone: '300 000 0000',
      username: 'test',
      password: 'test',
      enabled: true,
      role: 'USER',
    }

    it('should return updated customer', async () => {
      const { status, body } = await put(
        `${baseUrl}/customer/${customerId}`
      ).send(updateCustomerBody)

      expect(status).to.equal(StatusCodes.OK)
      expect(body).to.be.jsonSchema(CustomerSchema)
      expect(body).to.include({ address: updateCustomerBody.address })
    })

    it('should throw error if customer does not exist', async () => {
      try {
        await put(`${baseUrl}/customer/1000000`).send(updateCustomerBody)
      } catch (error) {
        expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
      }
    })
  })

  describe('when deleting customers', () => {
    describe('when deleting a customer', () => {
      it('should delete a customer', async () => {
        const { status } = await del(`${baseUrl}/customer/${customerId}`)

        expect(status).to.equal(StatusCodes.NO_CONTENT)
      })

      it('should throw error if customer does not exist', async () => {
        try {
          await del(`${baseUrl}/customer/1000000`)
        } catch (error) {
          expect(error.response?.status).to.equal(StatusCodes.NOT_FOUND)
        }
      })
    })

    describe('when deleting all customers', () => {
      it('should delete all customers', async () => {
        const { status } = await del(`${baseUrl}/customer/`)

        expect(status).to.equal(StatusCodes.NO_CONTENT)
      })
    })
  })
})
