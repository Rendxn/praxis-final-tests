import { $, ElementFinder } from 'protractor'

export class LoginPage {
  private userIdInput: ElementFinder
  private passwordInput: ElementFinder
  private loginBtn: ElementFinder

  constructor() {
    this.userIdInput = $('input[name="username"]')
    this.passwordInput = $('input[name="password"]')
    this.loginBtn = $('.loginFormButton > button')
  }

  public async login(username: string, password: string): Promise<void> {
    await this.userIdInput.sendKeys(username)
    await this.passwordInput.sendKeys(password)
    await this.loginBtn.click()
  }
}
