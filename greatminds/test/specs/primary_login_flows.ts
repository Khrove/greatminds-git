import LoginPage from '../pages/Login.page';
import CurriculaPage from '../pages/Curricula.page';

import options from '../../data';

const browser = options.browserConfig;
const account = options.data.accountData.accounts;
const curricula = options.data.curriculaData.curricula;

describe('Great Minds Primary (normal) Login Flows', () => {
    before(async () => {
        await LoginPage.open(browser.size);
        await LoginPage.verifyLoginPage();
    });

    it('Should allow teachers to login with valid credentials', async () => {
        await LoginPage.beginLoginWithEmail();
        await LoginPage.enterTextIn('email', account.teacher.username);
        await LoginPage.enterTextIn('password', account.teacher.password);
        await LoginPage.clickLoginBtn();
        await CurriculaPage.verifyTeacherDashboard(curricula.teacher.arr);
        await CurriculaPage.logAdminTeacherOut();
    });

    it('Should allow students to login with valid credentials', async () => {
        await LoginPage.beginLoginWithEmail();
        await LoginPage.enterTextIn('email', account.student.username);
        await LoginPage.enterTextIn('password', account.student.password);
        await LoginPage.clickLoginBtn();
        await CurriculaPage.verifyStudentDashboard(curricula.student);
        await CurriculaPage.logStudentOut();
    });

    it('Should allow district administrators to login with valid credentials', async () => {
        await LoginPage.beginLoginWithEmail();
        await LoginPage.enterTextIn('email', account.districtAdmin.username);
        await LoginPage.enterTextIn('password', account.districtAdmin.password);
        await LoginPage.clickLoginBtn();
        await CurriculaPage.verifyDistrictAdminDashboard(curricula.districtAdmin.arr);
        await CurriculaPage.logAdminTeacherOut();
    });

    it('Should allow users to login with a valid site code and credentials', async () => {
        await LoginPage.beginLoginWithSiteCode();
        await LoginPage.enterTextIn('sitecode', account.siteCode.code);
        await LoginPage.enterTextIn('username', account.siteCode.username);
        await LoginPage.enterTextIn('password', account.siteCode.password);
        await LoginPage.clickLoginBtn();
        await CurriculaPage.verifyDistrictAdminDashboard(curricula.districtAdmin.arr);
        await CurriculaPage.logAdminTeacherOut();
    });
});


