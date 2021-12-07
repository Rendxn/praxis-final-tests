import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor'

export class ProductListPage {
  private _checkoutBtn: ElementFinder
  public get checkoutBtn(): ElementFinder {
    return this._checkoutBtn
  }
  public set checkoutBtn(value: ElementFinder) {
    this._checkoutBtn = value
  }

  private products: ElementArrayFinder

  private _cartDigit: ElementFinder
  public get cartDigit(): ElementFinder {
    return this._cartDigit
  }
  public set cartDigit(value: ElementFinder) {
    this._cartDigit = value
  }

  constructor() {
    this.checkoutBtn = $('.checkout-button > a')
    this.products = $$('.productListWrapper > div')
    this.cartDigit = $('.cartDigit')
  }

  private findProductByName(name: string): ElementFinder {
    return this.products
      .filter(async (item: ElementFinder) => {
        const title = await item.$('.tileTitle').getText()
        return title === name
      })
      .first()
  }

  public async goToCheckout(): Promise<void> {
    browser.actions().mouseMove(this.checkoutBtn).perform()
    await this.checkoutBtn.click()
  }

  public async addItem(name = 'Unusable Security'): Promise<void> {
    const productCard: ElementFinder = await this.findProductByName(name)

    browser.actions().mouseMove(productCard).perform()
    await productCard.$('.tileAdd button').click()
  }
}
