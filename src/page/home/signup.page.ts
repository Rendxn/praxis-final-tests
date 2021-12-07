import { $, ElementFinder } from 'protractor'

export class SignUpPage {
  private userIdInput: ElementFinder
  private passwordInput: ElementFinder
  private signUpBtn: ElementFinder
  private successMsgContainer: ElementFinder
  private _successBtn: ElementFinder

  public get successBtn(): ElementFinder {
    return this._successBtn
  }
  public set successBtn(value: ElementFinder) {
    this._successBtn = value
  }

  constructor() {
    this.userIdInput = $('input[name="username"]')
    this.passwordInput = $('input[name="password"]')
    this.signUpBtn = $('.createFormButton > button')
    this.successBtn = $('.successButton button')
    this.successMsgContainer = $('.successMessage')
  }

  public async register(username: string, password: string): Promise<void> {
    await this.userIdInput.sendKeys(username)
    await this.passwordInput.sendKeys(password)
    await this.signUpBtn.click()
  }

  public async getSuccessMessage() {
    return this.successMsgContainer.getText()
  }

  public async goToShop(): Promise<void> {
    await this.successBtn.click()
  }
}
