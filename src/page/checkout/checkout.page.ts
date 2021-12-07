import { $, ElementFinder } from 'protractor'

interface IBillingFormFields {
  company: string
  title: string
  address: string
  city: string
}

interface ICreditCardFormFields {
  firstName: string
  lastName: string
  cardNumber: string
  cvv: string
  expirationDate: string
}

export class CheckoutPage {
  private companyInput: ElementFinder
  private titleInput: ElementFinder
  private addressInput: ElementFinder
  private cityInput: ElementFinder
  private firstNameInput: ElementFinder
  private lastNameInput: ElementFinder
  private cardNumberInput: ElementFinder
  private cvvInput: ElementFinder
  private expirationInput: ElementFinder
  private completeOrderBtn: ElementFinder
  private _form: ElementFinder

  public get form(): ElementFinder {
    return this._form
  }
  public set form(value: ElementFinder) {
    this._form = value
  }

  constructor() {
    this.companyInput = $('input[name="company"]')
    this.titleInput = $('input[name="title"]')
    this.addressInput = $('input[name="address"]')
    this.cityInput = $('input[name="city"]')
    this.firstNameInput = $('input[name="firstName"]')
    this.lastNameInput = $('input[name="lastName"]')
    this.cardNumberInput = $('input[name="cardNumber"]')
    this.cvvInput = $('input[name="cvv"]')
    this.expirationInput = $('input[name="expirationDate"]')
    this.completeOrderBtn = $('button[type="submit"]')
    this.form = $('.infoSection > form')
  }

  public async fillBillingInfo({
    address,
    company,
    city,
    title,
  }: IBillingFormFields) {
    await this.companyInput.sendKeys(company)
    await this.titleInput.sendKeys(title)
    await this.addressInput.sendKeys(address)
    await this.cityInput.sendKeys(city)
  }

  public async fillCreditCardInfo({
    firstName,
    lastName,
    cardNumber,
    cvv,
    expirationDate,
  }: ICreditCardFormFields) {
    // Tried using Promise.all
    await this.firstNameInput.click()
    await this.firstNameInput.sendKeys(firstName)
    await this.lastNameInput.click()
    await this.lastNameInput.sendKeys(lastName)
    await this.cvvInput.click()
    await this.cvvInput.sendKeys(cvv)
    await this.expirationInput.click()
    await this.expirationInput.sendKeys(expirationDate)
    await this.cardNumberInput.click()
    await this.cardNumberInput.sendKeys(cardNumber)
  }

  public async completeOrder() {
    await this.completeOrderBtn.click()
  }
}
