class CurriculaPage {
    get profileBtn() { return $('#avatar-card-btn'); }
    get studentProfileBtn() { return $('#__next > div > header > button'); }
    get studentLogoutBtn() { return $('[aria-label="Log Out"]'); }
    get teacherLogoutBtn() { return $('.logout-button'); }
    get studentConfirmLogoutBtn() { return $('[aria-label="Yes, log out"]'); }

    get teacherHeader() { return $('.grade-band-title-container > h2'); }
    get teacherBanner() { return $('[role="banner"] > div:nth-child(2) > h1'); }

    get studentBanner() { return $('.dCxSmL'); }
    get studentLeftNavMenuItem() { return $$('.hvOlQZ'); }

    get districtName() { return $('#district-dashboard-heading'); }

    // Landing page selectors
    get landingPageLoginWithEmailBtn() { return $('.fAlTKp'); }

    async verifyTeacherDashboard(data) {
        await this.teacherHeader.waitForClickable();
        await expect(this.teacherHeader).toHaveText('Story of Units');
        await expect(this.teacherBanner).toHaveText('Teach');

        // let gradeList = $('.gEpPgb');
        // for(let i = 0; i < data.length; i++) {
        //     let text = await gradeList.$('div').$$('.jzNTYj')[i].$$('.cKWQWv')[i].$$('span')[i].getText();
        //     console.log(text);
        //     console.log(data[i]);
        //     expect(text).toHaveText(data[i]);
        // }

        let grade = await $$('.gkxzNC')[0].getText();
        expect(grade).toHaveText('KINDERGARTEN');
    }

    async verifyStudentDashboard(data) {
        await this.studentBanner.waitForClickable();
        expect(this.studentBanner).toHaveText('Home');

        const list = await $('[aria-label="menu"]');
        const home = await list.$$('[role="tab"]')[0].$('a').$('img').getAttribute('src');
        const locker = await list.$$('[role="tab"]')[1].$('a').$('img').getAttribute('src');
        const tools = await list.$$('[role="tab"]')[2].$('button').$('img').getAttribute('src');

        expect(home).toHaveText(data.home);
        expect(locker).toHaveText(data.locker);
        expect(tools).toHaveText(data.tools);
    }

    async verifyDistrictAdminDashboard(data) {
        await this.districtName.waitForClickable();
        expect(this.districtName).toHaveText(data.district);

        let navList = await $('.jwvLSo');

        for(let i = 0; i < data.length; i++) {
            let text = await navList.$$('li')[i].$('button').$('span').getText();
            expect(text).toHaveText(data[i]);
        }
    }

    async logStudentOut() {
        await this.studentProfileBtn.waitForClickable();
        await this.studentProfileBtn.click();
        await this.studentLogoutBtn.waitForClickable();
        await this.studentLogoutBtn.click();
        await this.studentConfirmLogoutBtn.waitForClickable();
        await this.studentConfirmLogoutBtn.click();
        await this.landingPageLoginWithEmailBtn.waitForClickable();
    }

    async logAdminTeacherOut() {
        await this.profileBtn.waitForClickable();
        await this.profileBtn.click();
        await this.teacherLogoutBtn.waitForClickable();
        await this.teacherLogoutBtn.click();
        await this.landingPageLoginWithEmailBtn.waitForClickable();
    }
}

export default new CurriculaPage();