import { expect } from 'chai'
import environment from 'config/environment'
import { browser } from 'protractor'

describe('when open Atsea Shop', () => {
  beforeEach(async () => {
    await browser.get(environment.SELENIUM_BASE_URL)
  })

  it('then should have a title', async () => {
    expect(await browser.getTitle()).to.equal('Atsea Shop')
  })
})
