import LoginPage from '../pages/Login.page';

import options from '../../data';

const browser = options.browserConfig;
const account = options.data.accountData.accounts;

describe("Login Page Login With Email Exception Flows", () => {
    before(async () => {
       await LoginPage.open(browser.size);
       await LoginPage.beginLoginWithEmail();
    });

    afterEach(async () => {
       await LoginPage.goBack();
       await LoginPage.beginLoginWithEmail();
    });

    it('Should display an invalid email validation message if user provides a non email string', async () => {
        await LoginPage.enterTextIn('email', 'bbbb');
        await LoginPage.tabBetweenFields();
        await LoginPage.emailValidation(account.exceptions.invalidEmail);
    });

    it('Should display an email is required message if user enters an email, then clears the field', async () => {
        await LoginPage.enterTextIn('email', '');
        await LoginPage.tabBetweenFields();
        await LoginPage.emailValidation(account.exceptions.requiredEmail);
    });

    it('Should display a spaces validation message if a user enters an email with spaces', async () => {
        await LoginPage.enterTextIn('email', ' ');
        await LoginPage.tabBetweenFields();
        await LoginPage.emailValidation(account.exceptions.spacesEmail);
    });

    it('Should display a valid character message if a user provides an invalid alphanumeric or non @ . + - _ characters', async () => {
        await LoginPage.enterTextIn('email', '~');
        await LoginPage.tabBetweenFields();
        await LoginPage.emailValidation(account.exceptions.alphanumericEmail);
    });

    it('Should display a vague validation message if user submits incorrect credentials', async () => {
        await LoginPage.enterTextIn('email', 'beepboop@gmail.com');
        await LoginPage.enterTextIn('password', 'abcd1234');
        await LoginPage.clickLoginBtn();
        await LoginPage.bannerValidation(account.exceptions.bannerMsg);
    });

    it('Should display a password is required message if user enters a password, then clears the field', async () => {
        await LoginPage.enterTextIn('password', '');
        await LoginPage.tabBetweenFields();
        await LoginPage.passwordValidation(account.exceptions.requiredPassword);
    });

    it('Should disable the log in button if any field is marked as invalid', async () => {
        await LoginPage.enterTextIn('email', 'abcd');
        await LoginPage.enterTextIn('password', 'false');
        await LoginPage.tabBetweenFields();
        await LoginPage.verifyLoginIsDisabled();
    });
});

describe("Login Page Login With Site Code Exception Flows", () => {
    before(async () => {
        await LoginPage.goBack();
        await LoginPage.beginLoginWithSiteCode();
    });

    afterEach(async () => {
        await LoginPage.goBack();
        await LoginPage.beginLoginWithSiteCode();
    });

    it('Should display username is required validation message if a user enters a username then clears the field', async () => {
        await LoginPage.enterTextIn('username', '');
        await LoginPage.tabBetweenFields();
        await LoginPage.usernameValidation(account.exceptions.requiredUsername);
    });

    it('Should display password is required validation message if a user enters a password then clears the field', async () => {
        await LoginPage.enterTextIn('password', '');
        await LoginPage.tabBetweenFields();
        await LoginPage.passwordValidation(account.exceptions.requiredPassword);
    });

    it('Should display a site code is required message if a user enters a site code then clears the field', async () => {
        await LoginPage.enterTextIn('sitecode', '');
        await LoginPage.tabBetweenFields();
        await LoginPage.siteCodeValidation(account.exceptions.requiredSiteCode);
    });

    it('Should display a validation message if a user submits invalid site code and credentials', async () => {
        await LoginPage.enterTextIn('sitecode', 'abd');
        await LoginPage.enterTextIn('username', 'abb');
        await LoginPage.enterTextIn('password', 'abcd');
        await LoginPage.clickLoginBtn();
        await LoginPage.bannerValidation(account.exceptions.siteCodeBannerMsg);
    });

    it('Should require at least 3 characters for the site code field', async () => {
        await LoginPage.enterTextIn('sitecode', 'a');
        await LoginPage.tabBetweenFields();
        await LoginPage.siteCodeValidation(account.exceptions.char3SiteCode);
    });

    it('Should limit the site code field to 24 or fewer characters', async () => {
        await LoginPage.enterTextIn('sitecode', 'asdfasdfasdfasfdasdfasdfafdadsf');
        await LoginPage.tabBetweenFields();
        await LoginPage.siteCodeValidation(account.exceptions.char24SiteCode);
    });

    it('Should require alphanumeric characters in the site code field', async () => {
        await LoginPage.enterTextIn('sitecode', '~');
        await LoginPage.tabBetweenFields();
        await LoginPage.siteCodeValidation(account.exceptions.alphaNumericSiteCode);
    });

    it('Should not allow spaces for the site code field', async () => {
        await LoginPage.enterTextIn('sitecode', ' ');
        await LoginPage.tabBetweenFields();
        await LoginPage.siteCodeValidation(account.exceptions.spacesSiteCode);
    });

    it('Should display a vague validation message if a user submits correct credentials, but an incorrect site code', async () => {
        await LoginPage.enterTextIn('sitecode', 'bbbb');
        await LoginPage.enterTextIn('password', account.siteCode.password);
        await LoginPage.enterTextIn('username', account.siteCode.username);
        await LoginPage.tabBetweenFields();
        await LoginPage.clickLoginBtn();
        await LoginPage.bannerValidation(account.exceptions.siteCodeBannerMsg);
    });

    it('Should disable the log in button if any field is marked as invalid', async () => {
        await LoginPage.verifyLoginIsDisabled();
    });
});