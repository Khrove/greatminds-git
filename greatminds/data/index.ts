let data;
let browserConfig;

try {
    data = require(`./${process.env.APP}/${process.env.NODE_ENV}/index`);
    console.log('Test data has been configured');
} catch (e) {
    console.log('Failed to load test data. Please make sure you provide a valid NODE_ENV variable: production, staging, test, etc');
}

try {
    browserConfig = require(`./devices/${process.env.TESTON}`);
    console.log('Browser config data has been configured');
} catch(e) {
    console.log('Failed to load browser config data. Please make sure you provide a valid TESTON variable: chrome, tablet');
}


export = {
    data,
    browserConfig,
}