import { expect } from 'chai'
import { del, get } from 'superagent'
import {
  browser,
  ExpectedConditions,
  ProtractorExpectedConditions,
} from 'protractor'
import { HeaderPage, SignUpPage } from 'src/page'
import environment from 'config/environment'

describe('given the atsea page', () => {
  const EC: ProtractorExpectedConditions = ExpectedConditions

  before(async () => {
    await browser.get(environment.SELENIUM_BASE_URL)
    await browser.wait(EC.urlContains('index.html'), 10000)
  })

  describe('when sign up', () => {
    const newCustomer = {
      username: 'r',
      password: 'r',
    }

    before(async () => {
      const headerPage: HeaderPage = new HeaderPage()

      await headerPage.signOut()
      await browser.sleep(2000)

      await headerPage.openRegisterModal()
    })

    it('should congratulate the created user', async () => {
      const registerPage: SignUpPage = new SignUpPage()
      await registerPage.register(newCustomer.username, newCustomer.password)

      await browser.wait(EC.visibilityOf(registerPage.successBtn), 10000)

      expect(await registerPage.getSuccessMessage()).to.equal(
        'Congratulations! Your account has been created!'
      )
    })

    after(async () => {
      const { body } = await get(
        `${environment.API_BASE_URL}/api/customer/username=${newCustomer.username}`
      )
      await del(`${environment.API_BASE_URL}/api/customer/${body.customerId}`)
    })
  })
})
