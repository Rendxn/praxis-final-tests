import environment from 'config/environment'
import {
  browser,
  ExpectedConditions,
  ProtractorExpectedConditions,
} from 'protractor'
import { LoginPage, HeaderPage } from 'src/page'

export const prepare = async () => {
  // ----------- browser -----------
  await browser.waitForAngularEnabled(false)
  await browser.manage().window().maximize()
  browser.manage().timeouts().implicitlyWait(0)

  // ------------ auth -------------
  const EC: ProtractorExpectedConditions = ExpectedConditions
  const headerPage: HeaderPage = new HeaderPage()
  const loginPage: LoginPage = new LoginPage()

  await browser.get(environment.SELENIUM_BASE_URL)
  await browser.wait(EC.urlContains('index.html'), 10000)

  await headerPage.openSignInModal()
  await browser.sleep(1000)

  await loginPage.login('t', 't')
  await browser.sleep(2000)
}
