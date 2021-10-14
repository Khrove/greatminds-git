import LoginPage from '../pages/Login.page';
import CurriculaPage from '../pages/Curricula.page';

import options from '../../data';

const browser = options.browserConfig;
const account = options.data.accountData.accounts;
const curricula = options.data.curriculaData.curricula;

describe("Great Minds Alternative (secondary) Login Flows", () => {
   before(async () => {
       await LoginPage.open(browser.size);
   });

   it('Should allow users to change their login method after beginning a flow', async () => {
        await LoginPage.verifyLoginPage();
        await LoginPage.beginLoginWithEmail();
        await LoginPage.enterTextIn('email', account.teacher.username);
        await LoginPage.goBack();
        await LoginPage.verifyLoginPage();
   });

   it('Should allow users to reveal their entered password in plaintext', async  () => {
        await LoginPage.beginLoginWithEmail();
        await LoginPage.enterTextIn('password', account.visual.password);
        await LoginPage.revealPassword();
   });

   it('Should allow users to login by pressing the enter key', async () => {
        await LoginPage.enterTextIn('email', account.teacher.username);
        await LoginPage.enterTextIn('password', account.teacher.password);
        await LoginPage.loginWithEnterKey();
        await CurriculaPage.verifyTeacherDashboard(curricula.teacher.arr);
        await CurriculaPage.logAdminTeacherOut();
   });

   it('Should allow users to use the forgot password functionality', async () => {
        await LoginPage.beginLoginWithEmail();
        await LoginPage.forgotYourPassword();
   });
});