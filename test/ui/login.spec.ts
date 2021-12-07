import { expect } from 'chai'
import { del } from 'superagent'
import {
  browser,
  ExpectedConditions,
  ProtractorExpectedConditions,
} from 'protractor'
import { HeaderPage, LoginPage, SignUpPage } from '../../src/page'

describe('given the atsea page', () => {
  const EC: ProtractorExpectedConditions = ExpectedConditions

  before(async () => {
    await browser.get('http://host.docker.internal:8080')
    await browser.wait(EC.urlContains('index.html'), 5000)
  })

  describe('when sign up', () => {
    const headerPage: HeaderPage = new HeaderPage()

    before(async () => {
      const registerPage: SignUpPage = new SignUpPage()

      await headerPage.openRegisterModal()
      await registerPage.register('2', '2')
      await browser.wait(EC.visibilityOf(registerPage.successBtn), 5000)
      // User is logged in
      await registerPage.goToShop()
    })

    // Remove created customers for idempotency
    after(async () => {
      await del(`http://localhost:8080/api/customer/`)
    })

    describe('when sign out', () => {
      before(async () => {
        headerPage.signOut()
      })
      describe('when sign in', () => {
        before(async () => {
          headerPage.openSignInModal()
          await browser.sleep(2000)
        })

        it('should sign in the user', async () => {
          const loginPage: LoginPage = new LoginPage()
          await loginPage.login('2', '2')

          await browser.sleep(2000)

          expect(await headerPage.signOutBtn.isDisplayed()).to.be.true
        })
      })
    })
  })
})
