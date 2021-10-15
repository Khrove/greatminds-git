# Getting started
Welcome to my Great Minds assessment! This is a simple read me file put together to help explain WebdriverIO's process

### Explanation of package.json scripts / environment variables
Environment Variables:
1. APP -- This value represents the application that you want to run your tests against.
2. NODE_ENV -- This value represents the environment you want to test against. Examples could be production, staging, dev, etc.
3. TESTON -- This value represents what you want to run your tests on. Example here would be testing on chrome or a tablet
4. SIZE -- This value represents the size of the window you want to test on since we aren't testing against real devices. This enables a form of "mobile" testing without having access to a real device through Appium or BrowserStack / SauceLabs.


Script explanation:

"login:production:primary": "APP=dashboard NODE_ENV=production TESTON=chrome SIZE=default wdio config/production.conf.ts --suite primary",

* [APP=dashboard]: Sets the application that we're testing against to the dashboard
* [NODE_ENV=production]: Sets the environment that we're testing in to production
* [TESTON:chrome]: Sets our tests to take place in a Chrome browser
* [SIZE=default]:Sets our tests to test on a default sized browser window. In this case it's 1920x1080 which can be found in ./data/devices/chrome.ts
* [wdio config/production.conf.ts]: We're running out tests against the production config. wdio is WebDriverIO's CLI command. Having specific named config files enables you to control environment specific variables such as the baseUrl of your tests. If we were testing in a lower environment than production we could set something up like staging.config.ts, etc
* [--suite primary]: Sets the suite that we're testing against to primary. This enables us to setup suite specific testing such as if we only wanted to test against primary flows, exception flows, etc or if we wanted to just test everything in an e2e or regression test

### Explanation of what happens when you run one of the scripts
1. WDIO looks at the config mentioned in your script 
2. In the config file we import in our test data object to set the baseUrl
3. WDIO then looks for the suite you mentioned in your script and goes to the first spec file provided
4. In the spec file it imports in all of the different pages needed to perform the test
5. In the spec file it imports in all of the data objects and breaks them out into usable variables
6. Runs the test spec using mocha as a test runner

### Explanation of reporters
Spec reporter -- Command line reporter used to display results at the end of a test 

Allure reporter -- Provides a more 'fancy' GUI for displaying test results and averages

Run script allure:generate to generate the allure report. Spec report is generated automatically.
