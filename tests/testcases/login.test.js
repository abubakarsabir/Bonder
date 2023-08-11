require('dotenv').config();
const {
    test,
    expect
} = require('@playwright/test');
const {
    LoginPage
} = require('../pages/login.page');

test.describe('Login Test Cases', () => {
    let page;
    let loginPage;

    test.beforeAll(async ({
        browser
    }) => {
        page = await browser.newPage();
    });

    test.beforeEach(async () => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Login - Login Empty', async () => {
        await loginPage.setEmail('');
        await loginPage.setPassword('');
        await loginPage.clickLogin();
        await loginPage.verifyError('You could not be logged in. Please check your input.');
    });


    test('Login - Non-Existent E-Mail', async () => {
        await loginPage.setEmail(process.env.nEmail);
        await loginPage.clickLogin();
        await loginPage.verifyError('You could not be logged in. Please check your input.');
    });

    test('Login - Wrong Credentials', async () => {
        await loginPage.setEmail(process.env.WRONG_EMAIL);
        await loginPage.setPassword(process.env.WRONG_PASSWORD);
        await loginPage.clickLogin();
        await loginPage.verifyError('You could not be logged in. Please check your input.');
    });

    test('Login - Correct Credentials', async () => {
        await loginPage.setEmail(process.env.EMAIL);
        await loginPage.setPassword(process.env.PASSWORD);
        await loginPage.clickLogin({
            timeout: 200000
        });
        await loginPage.verifyContactEmail(process.env.EMAIL);
        await loginPage.verifyRedirect(process.env.dashBoard);
    });
});