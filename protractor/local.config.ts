import { Config } from 'protractor'
import { setup, prepare, teardown } from './hooks'

export const config: Config = {
  framework: 'mocha',
  specs: ['../test/ui/**/*.spec.ts'],
  seleniumAddress: 'http://0.0.0.0:4444/',
  SELENIUM_PROMISE_MANAGER: false,
  beforeLaunch: async () => {
    await setup()
  },
  onPrepare: async () => {
    await prepare()
  },
  afterLaunch: async () => {
    await teardown()
  },
  mochaOpts: {
    reporter: 'mochawesome-screenshots',
    timeout: 30000,
  },
  multiCapabilities: [
    {
      browserName: 'chrome',
      name: 'chrome-tests',
      shardTestFiles: true,
      maxInstances: 1,
      chromeOptions: {
        args: [
          '--disable-popup-blocking',
          '--no-default-browser-check',
          '--ignore-certificate-errors',
        ],
      },
    },
    {
      browserName: 'firefox',
      name: 'firefox-tests',
      shardTestFiles: true,
      maxInstances: 1,
      acceptInsecureCerts: true,
      'moz:firefoxOptions': {
        args: ['-headless'],
      },
    },
  ],
}
