import options from '../data';

// @ts-ignore
export const config: WebdriverIO.Config = {
    specs: [
        './test/specs/**/*.ts'
    ],
    suites: {
        primary: [
            './test/specs/primary_login_flows.ts'
        ],
        alternative: [
            './test/specs/alternative_login_flows.ts'
        ],
        exception: [
            './test/specs/exception_login_flows.ts'
        ]
    },
    exclude: [
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'warn',
    bail: 0,
    baseUrl: options.data.environmentData.environment.url,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec',['allure', {outputDir: 'allure-results'}]],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            browser.takeScreenshot();
        }
    },
}
