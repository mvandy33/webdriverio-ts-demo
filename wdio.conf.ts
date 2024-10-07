import type { Options } from '@wdio/types'
export const config: Options.Testrunner = {
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        '**/*.e2e.ts'
    ],
    exclude: [

    ],
    maxInstances: process.env.HEADLESS === 'true' ? 10 : 1,
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        "goog:chromeOptions": {
            args: process.env.HEADLESS === 'true' ? [
                '--headless',
                '--disable-gpu',
                '--no-sandbox',
                '--log-level=3'
            ] : []
        }
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://www.baseball-reference.com/',
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        [
            'allure',
            { outputDir: 'allure-results' }
        ]
    ],
    mochaOpts: {
        bail: process.env.headless === 'true' ? true : false,
        timeout: '120000'
    },
    afterTest: async () => {
        await browser.takeScreenshot();
    }
}
