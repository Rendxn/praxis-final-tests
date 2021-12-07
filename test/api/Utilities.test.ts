import { get } from 'superagent'
import { StatusCodes } from 'http-status-codes'
import * as chai from 'chai'
import * as chaiJsonSchema from 'chai-json-schema'

chai.use(chaiJsonSchema)
const { expect } = chai

const baseUrl = 'http://localhost:8080/utility'

describe('System Utilities API Test', () => {
    describe('when checking database healthcheck', () => {
        const errorMessage = "Database not responding."
        it('should return database status', async () => {
            try {
                const { status, body } = await get(`${baseUrl}/healthcheck/`)
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.have.property('status')
            } catch (error) {
                const { status, body } = error.response
                expect(status).to.equal(StatusCodes.INTERNAL_SERVER_ERROR)
                expect(body.error).to.equal(errorMessage)
            }
        })
    })

    describe('when getting container id', () => {
        const errorMessage = "Container id not found"
        it('should return the container host and ip', async () => {
            try {
                const { status, body } = await get(`${baseUrl}/containerid/`)
                expect(status).to.equal(StatusCodes.OK)
                expect(body).to.have.property('host')
                expect(body).to.have.property('ip')
            } catch (error) {
                const { status, body } = error.response
                expect(status).to.equal(StatusCodes.NOT_FOUND)
                expect(body.error).to.equal(errorMessage)
            }
        })
    })
})
