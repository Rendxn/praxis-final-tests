import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'
import { ProductListSchema, ProductSchema } from 'src/schema/Product.schema'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = 'http://localhost:8080/api'

describe('Product API tests', () => {
  describe('when getting all products /api/product/', () => {
    it('should return products', async () => {
      const { status, body } = await get(`${baseUrl}/product/`)
      expect(status).to.equal(StatusCodes.OK)
      expect(body).to.be.jsonSchema(ProductListSchema)
    })
  })

  describe('when getting a single product /api/product/:id', () => {
    const productId = 1

    it(`should return a product with id ${productId}`, async () => {
      const { status, body } = await get(`${baseUrl}/product/${productId}`)
      expect(status).to.equal(StatusCodes.OK)
      expect(body).to.be.jsonSchema(ProductSchema)
    })
  })
})
