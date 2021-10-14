class LoginPage {
    get loginWithEmailBtn() { return $('.fAlTKp'); }
    get loginWithSiteCodeBtn() { return $('.bhnUCZ'); }
    get backBtn() { return $('[aria-label="Back to login options"]'); }
    get revealPasswordBtn() { return $('[title="Show Password"]'); }

    // Log in with email selectors
    get emailInput() { return $('#email'); }
    get passwordInput() { return $('#password'); }
    get loginBtn() { return $('[aria-label="Log in"]'); }

    // Log in with site code selectors
    get siteCodeInput() { return $('#sitecode'); }
    get usernameInput() { return $('#username'); }

    // Curriculum dashboard selector for pausing
    get curriculaHeader() { return $('.PHaDG > span:nth-child(2) > h2'); }

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
}

export default new LoginPage();