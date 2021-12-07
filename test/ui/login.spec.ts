import { expect } from 'chai'
import { browser } from 'protractor'
import { HeaderPage, LoginPage } from 'src/page'

describe('given the atsea page', () => {
  describe('when sign out', () => {
    const headerPage: HeaderPage = new HeaderPage()
    before(async () => {
      headerPage.signOut()
      await browser.sleep(2000)
    })

    describe('when sign in', () => {
      before(async () => {
        headerPage.openSignInModal()
        await browser.sleep(2000)
      })

      it('should sign in the user', async () => {
        const loginPage: LoginPage = new LoginPage()
        await loginPage.login('t', 't')
        await browser.sleep(2000)

        expect(await headerPage.signOutBtn.isDisplayed()).to.be.true
      })
    })
  })
})
