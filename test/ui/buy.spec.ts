import { expect } from 'chai'
import {
  browser,
  ExpectedConditions,
  ProtractorExpectedConditions,
} from 'protractor'
import {
  SignUpPage,
  ProductListPage,
  HeaderPage,
  CheckoutPage,
  SuccessPage,
} from '../../src/page'
import { del } from 'superagent'

const EC: ProtractorExpectedConditions = ExpectedConditions

describe('when buying an item', () => {
  before(async () => {
    await browser.get('http://host.docker.internal:8080')
    await browser.wait(EC.urlContains('index.html'), 5000)
  })

  describe('when openining sign up modal', () => {
    before(async () => {
      const headerPage: HeaderPage = new HeaderPage()
      await headerPage.openRegisterModal()
    })

    describe('when signin up', async () => {
      before(async () => {
        await del(`http://localhost:8080/api/customer/`)
        const registerPage: SignUpPage = new SignUpPage()
        await registerPage.register('3', '3')

        await browser.wait(EC.visibilityOf(registerPage.successBtn), 5000)

        // User is logged in
        await registerPage.goToShop()
        await browser.sleep(2000)
      })

      // Remove created customers for idempotency
      after(async () => {
        await del(`http://localhost:8080/api/customer/`)
      })

      describe('and add Docker Tooling to cart', () => {
        const productListPage: ProductListPage = new ProductListPage()

        before(async () => {
          await productListPage.addItem('Docker Tooling')
          await browser.sleep(2000)
        })

        describe('and navigate to checkout', () => {
          before(async () => {
            await productListPage.goToCheckout()
          })

          describe('and fill checkout form', () => {
            before(async () => {
              const checkoutPage: CheckoutPage = new CheckoutPage()
              await browser.wait(EC.visibilityOf(checkoutPage.form), 5000)

              await checkoutPage.fillCreditCardInfo({
                cardNumber: '5000 0000 0000 0000',
                cvv: '500',
                expirationDate: '12/30',
                firstName: 'Test',
                lastName: 'Customer',
              })

              await checkoutPage.fillBillingInfo({
                address: 'Test address',
                city: 'Test city',
                company: 'Test company',
                title: 'Test title',
              })

              await checkoutPage.completeOrder()
            })

            it('should have placed an order', async () => {
              const successPage: SuccessPage = new SuccessPage()

              expect(await successPage.getSuccessMsg()).to.equal(
                'You have successfully placed an order!'
              )
            })
          })
        })
      })
    })
  })
})
