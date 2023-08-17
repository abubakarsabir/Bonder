const { expect } = require("@playwright/test");

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://prototype.getbonder.com/backoffice/login");
    }

    async setEmail(email) {
        await this.page.fill(
            "form#login > div.space-y-4 > div.form-group > input#email",
            email
        );
    }

    async setPassword(password) {
        await this.page.fill("div.form-group > input#password", password);
    }

    async clickLogin() {
        await this.page.click("button#loginButton");
    }

    async verifyError(errorText) {
        await this.page.waitForSelector('div[role="alert"].validation--error', {
            state: "attached",
        });
        const errorElement = await this.page.$(
            'div[role="alert"].validation--error'
        );
        if (errorElement) {
            const error = await errorElement.innerText();
            expect(error).toBe(errorText);
        } else {
            throw new Error("Error message element not found");
        }
    }

    async verifyRedirect(expectedUrl) {
        await this.page.waitForURL(expectedUrl, { timeout: 200000 });
        expect(this.page.url()).toBe(expectedUrl);
      }
      

    async verifyContactEmail(email) {
        const emailElement = await this.page.waitForSelector(
            "td.h-full.p-0 > a#UsersCell-email-8d8edd50-a4cd-4556-a766-1370525b6f31",
            {
                state: "attached",
            }
        );
        const emailText = await emailElement.innerText();
    }

    async verifyLoginButtonState() {
        const loginButton = await this.page.$("button#loginButton");
        const isEnabled = await loginButton.isEnabled();
        expect(isEnabled).toBeTruthy();
    }

    async filterCreatedEmails(){
        await this.page.click('//*[@id="UsersSortButtoncreatedAt"]/span');
    }

}

module.exports = {
    LoginPage,
};