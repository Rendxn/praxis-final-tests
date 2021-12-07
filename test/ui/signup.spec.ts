import { expect } from 'chai'
import { del } from 'superagent'
import {
  browser,
  ExpectedConditions,
  ProtractorExpectedConditions,
} from 'protractor'
import { HeaderPage, SignUpPage } from '../../src/page'

describe('given the atsea page', () => {
  const EC: ProtractorExpectedConditions = ExpectedConditions

  before(async () => {
    await browser.get('http://host.docker.internal:8080')
    await browser.wait(EC.urlContains('index.html'), 5000)
  })

  describe('when sign up', () => {
    before(async () => {
      const headerPage: HeaderPage = new HeaderPage()
      await headerPage.openRegisterModal()
    })

    // Remove created customers for idempotency
    after(async () => {
      await del(`http://localhost:8080/api/customer/`)
    })

    it('should congratulate the created user', async () => {
      const registerPage: SignUpPage = new SignUpPage()
      await registerPage.register('123', '123')

      await browser.wait(EC.visibilityOf(registerPage.successBtn), 5000)

      expect(await registerPage.getSuccessMessage()).to.equal(
        'Congratulations! Your account has been created!'
      )
    })
  })
})
