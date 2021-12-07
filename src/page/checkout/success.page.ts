import { $, ElementFinder } from 'protractor'

export class SuccessPage {
  private successMsg: ElementFinder

  constructor() {
    this.successMsg = $('.successMessage')
  }

  public async getSuccessMsg() {
    return this.successMsg.getText()
  }
}
