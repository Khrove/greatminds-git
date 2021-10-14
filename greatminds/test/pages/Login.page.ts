class LoginPage {
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

    // Log in with site code selectors
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

    async open(data) {
        await browser.url('/');
        await browser.setWindowSize(data.width, data.height);
    }

    async enterTextIn(selector, text) {
        await $(`#${selector}`).waitForClickable();
        await $(`#${selector}`).setValue(text);
    }

    async beginLoginWithEmail() {
        await this.loginWithEmailBtn.waitForClickable();
        await this.loginWithEmailBtn.click();
    }

    async beginLoginWithSiteCode() {
        await this.loginWithSiteCodeBtn.waitForClickable();
        await this.loginWithSiteCodeBtn.click();
    }

    async clickLoginBtn() {
        await this.loginBtn.waitForClickable();
        await this.loginBtn.click();
    }

    async loginWithEnterKey() {
        // https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions
        await browser.keys('\uE007');
    }

    async tabBetweenFields() {
        await browser.keys('\uE004');
    }

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

    async emailValidation(data) {
        await this.emailValidationMsg.waitForClickable();
        let msg = await this.emailValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    async passwordValidation(data) {
        await this.passwordValidationMsg.waitForClickable();
        let msg = await this.passwordValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    async usernameValidation(data) {
        await this.usernameValidationMsg.waitForClickable();
        let msg = await this.usernameValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    async siteCodeValidation(data) {
        await this.siteCodeValidationMsg.waitForClickable();
        let msg = await this.siteCodeValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    async bannerValidation(data) {
        await this.bannerValidationMsg.waitForClickable();
        let msg = await this.bannerValidationMsg.getText();
        expect(msg).toHaveText(data);
    }

    async goBack() {
        await this.backBtn.waitForClickable();
        await this.backBtn.click();
    }

    async revealPassword() {
        let inputType = await this.passwordInput.getAttribute('type');
        expect(inputType).toHaveText('password');
        await this.revealPasswordBtn.waitForClickable();
        await this.revealPasswordBtn.click();
        inputType = await this.passwordInput.getAttribute('type');
        expect(inputType).toHaveText('text');
        await browser.pause(1000);
    }

    async verifyLoginPage() {
        await this.loginWithEmailBtn.waitForClickable();
        expect(this.loginWithEmailBtn).toHaveText('Log in with email');
        expect(this.loginWithSiteCodeBtn).toHaveText('Log in with site code');
    }

    async verifyLoginIsDisabled() {
        let disabled = await this.loginBtn.getAttribute('aria-disabled');
        expect(disabled).toHaveText('true');
    }
}

export default new LoginPage();