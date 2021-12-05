import { browser, Config } from 'protractor'

export const config: Config = {
  framework: 'mocha',
  specs: ['../test/ui/**/*.spec.js'],
  seleniumAddress: 'http://0.0.0.0:4444/',
  SELENIUM_PROMISE_MANAGER: false,
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false)
  },
  mochaOpts: {
    reporter: 'mochawesome-screenshots',
  },
  multiCapabilities: [
    {
      browserName: 'chrome',
      name: 'chrome-tests',
      shardTestFiles: true,
      maxInstances: 1,
      chromeOptions: {
        args: [],
      },
    },
    {
      browserName: 'firefox',
      name: 'firefox-tests',
      shardTestFiles: true,
      maxInstances: 1,
      'moz:firefoxOptions': {
        args: [],
      },
    },
  ],
}
