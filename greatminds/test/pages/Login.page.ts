/****************************************************
 * @page Login Page
 * @desc Page containing selectors and functions for the login page.
 * @actions Handles logging in, exception validation messages, opening up the application, forgot password flow, etc
 *****************************************************/
class LoginPage {
    // Login page buttons
    get loginWithEmailBtn() { return $('.fAlTKp'); }
    get loginWithSiteCodeBtn() { return $('.bhnUCZ'); }
    get backBtn() { return $('[aria-label="Back to login options"]'); }
    get revealPasswordBtn() { return $('[title="Show Password"]'); }
    get forgotYourPasswordBtn() { return $('.kWLaSB'); }
    get inactivePasswordResetBtn() { return $('.fhzThe'); }
    get activePasswordResetBtn() { return $('.aveOh'); }

    // Log in with email selectors
    get emailInput() { return $('#email'); }
    get passwordInput() { return $('#password'); }
    get loginBtn() { return $('[aria-label="Log in"]'); }

    // Log in with site code selectors, password selector is shared between flows
    get siteCodeInput() { return $('#sitecode'); }
    get usernameInput() { return $('#username'); }

    // Curriculum dashboard selector for pausing
    get curriculaHeader() { return $('.PHaDG > span:nth-child(2) > h2'); }

    // Exception selectors
    get emailValidationMsg() { return $('.EmailInputstyled__StyledErrorMessage-f2coli-4'); }
    get usernameValidationMsg() { return $('[aria-labelledby="Enter your username"]'); }
    get siteCodeValidationMsg() { return $('[aria-labelledby="Enter your Site code"]'); }
    get passwordValidationMsg() { return $('.Passwordstyled__Message-sc-16fjgtu-2'); }
    get bannerValidationMsg() { return $('#undefineddialogDesc'); }

    /**
     * @function open
     * @desc Opens the provided baseUrl (found in wdio config) to the '/' route
     * @param {Object} data Contains window width and height values. This is used to simulate testing on a normal sized browser or tablet for now.
     */
    async open(data) {
        await browser.url('/');
        await browser.setWindowSize(data.width, data.height);
    }

    /**
     * @function enterTextIn
     * @desc Provides users with a reusable method to filling in forms at their own pace, rather than providing one function to fill in the whole form
     * @param {string} selector Input that you want to enter text into, examples are: username, password, sitecode
     * @param {string} text Text that you want to input in the provided selector
     */
    async enterTextIn(selector, text) {
        await $(`#${selector}`).waitForClickable();
        await $(`#${selector}`).setValue(text);
    }

    /**
     * @function beginLoginWithEmail
     * @desc Clicks on the Login With Email button on the landing page to begin a login with email flow
     */
    async beginLoginWithEmail() {
        await this.loginWithEmailBtn.waitForClickable();
        await this.loginWithEmailBtn.click();
    }

    /**
     * @function beginLoginWithSiteCode
     * @desc Clicks on the Login With Site Code button on the landing page to begin a login with site code flow
     */
    async beginLoginWithSiteCode() {
        await this.loginWithSiteCodeBtn.waitForClickable();
        await this.loginWithSiteCodeBtn.click();
    }

    /**
     * @function clickLoginBtn
     * @desc Clicks on the login button to either force validation message to display or log a user in
     */
    async clickLoginBtn() {
        await this.loginBtn.waitForClickable();
        await this.loginBtn.click();
    }

    /**
     * @function loginWithEnterKey
     * @desc Alternative method to logging in. Rather than clicking the login button this simply presses the enter key. Page validation is performed in other functions
     */
    async loginWithEnterKey() {
        // https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
        await browser.keys('\uE007');
    }

    /**
     * @function tabBetweenFields
     * @desc Presses the tab key. This function is used to force out validation messages. Easier to do this than click on a different input field
     */
    async tabBetweenFields() {
        await browser.keys('\uE004');
    }

    /**
     * @function forgotYourPassword
     * @desc Handles the navigation to the forgot password page, verifies the url of the page you land on, verifies that the submit button is disabled and enabled when expected
     */
    async forgotYourPassword() {
        await this.forgotYourPasswordBtn.waitForClickable();
        await this.forgotYourPasswordBtn.click();

        let url = await browser.getUrl();
        expect(url).toHaveText('https://digital.greatminds.org/forgot-password');
        let submitBtnAttr = await this.inactivePasswordResetBtn.getAttribute('aria-disabled');
        expect(submitBtnAttr).toHaveText('true');

        await this.emailInput.waitForClickable();
        await this.emailInput.setValue('BeepBoopRoboot@gmail.com');

        submitBtnAttr = await this.activePasswordResetBtn.getAttribute('aria-disabled');
        expect(submitBtnAttr).toHaveText('false');
    }

    /**
     * @function emailValidation
     * @desc Verifies an email validation message
     * @params {string} data String value containing the message that should be displaying
     */
    async emailValidation(data) {
        await this.emailValidationMsg.waitForClickable();
        let msg = await this.emailValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    /**
     * @function passwordValidation
     * @desc Verifies a password validation message
     * @params {string} data String value containing the message that should be displaying
     */
    async passwordValidation(data) {
        await this.passwordValidationMsg.waitForClickable();
        let msg = await this.passwordValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    /**
     * @function usernameValidation
     * @desc Verifies a username validation message
     * @params {string} data String value containing the message that should be displaying
     */
    async usernameValidation(data) {
        await this.usernameValidationMsg.waitForClickable();
        let msg = await this.usernameValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    /**
     * @function siteCodeValidation
     * @desc Verifies a sitecode validation message
     * @params {string} data String value containing the message that should be displaying
     */
    async siteCodeValidation(data) {
        await this.siteCodeValidationMsg.waitForClickable();
        let msg = await this.siteCodeValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    /**
     * @function bannerValidation
     * @desc Verifies the banner's validation message
     * @params {string} data String value containing the message that should be displaying
     */
    async bannerValidation(data) {
        await this.bannerValidationMsg.waitForClickable();
        let msg = await this.bannerValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    /**
     * @function goBack
     * @desc Presses the back button on both login methods
     */
    async goBack() {
        await this.backBtn.waitForClickable();
        await this.backBtn.click();
    }

    /**
     * @function revealPassword
     * @desc Clicks the reveal password button; when you click the reveal password button the attribute type of the password input changes. This also verifies that the type changes when expected
     */
    async revealPassword() {
        let inputType = await this.passwordInput.getAttribute('type');
        expect(inputType).toHaveText('password');
        await this.revealPasswordBtn.waitForClickable();
        await this.revealPasswordBtn.click();
        inputType = await this.passwordInput.getAttribute('type');
        expect(inputType).toHaveText('text');
        await browser.pause(1000);
    }

    /**
     * @function verifyLoginPage
     * @desc Verifies the user is on the login page. Normally used after logging out of an account or at the start of a flow to make sure you're starting where you think you should be
     */
    async verifyLoginPage() {
        await this.loginWithEmailBtn.waitForClickable();
        expect(this.loginWithEmailBtn).toHaveText('Log in with email');
        expect(this.loginWithSiteCodeBtn).toHaveText('Log in with site code');
    }

    /**
     * @function verifyLoginIsDisabled
     * @desc Verifies the login button is disabled. This is used in exception testing
     */
    async verifyLoginIsDisabled() {
        let disabled = await this.loginBtn.getAttribute('aria-disabled');
        expect(disabled).toHaveText('true');
    }
}

export default new LoginPage();