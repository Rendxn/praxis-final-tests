import { $, ElementFinder } from 'protractor'

export class HeaderPage {
  private signInBtn: ElementFinder
  private _signOutBtn: ElementFinder
  public get signOutBtn(): ElementFinder {
    return this._signOutBtn
  }
  public set signOutBtn(value: ElementFinder) {
    this._signOutBtn = value
  }
  private registerBtn: ElementFinder

  constructor() {
    this.signInBtn = $('.buttonSection button:nth-child(2)')
    this.signOutBtn = $('.welcomeMessage + button')
    this.registerBtn = $('.buttonSection button:nth-child(1)')
  }

  public async openSignInModal(): Promise<void> {
    await this.signInBtn.click()
  }

  public async openRegisterModal(): Promise<void> {
    await this.registerBtn.click()
  }

  public async signOut(): Promise<void> {
    await this.signOutBtn.click()
  }
}
