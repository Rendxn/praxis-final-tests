import { $, ElementFinder } from 'protractor'

export class SuccessPage {
  private _successMsg: ElementFinder

  public set successMsg(value) {
    this._successMsg = value
  }

  public get successMsg(): ElementFinder {
    return this._successMsg
  }

  constructor() {
    this.successMsg = $('.successMessage')
  }

  public async getSuccessMsg() {
    return this.successMsg.getText()
  }
}
