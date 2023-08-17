const {
    expect
} = require('@playwright/test');
require('dotenv').config();

class CustomerPage {
    constructor(page) {
        this.page = page;
    }

    async clickNewCustomer() {
        await this.page.waitForSelector('button.button.button--primary:has-text("New customer")');
        await this.page.click('button.button.button--primary:has-text("New customer")');
    }

    async closeSlideOverPage() {
        await this.page.getByRole('button', { name: 'Close ' }).click();
    }

    async verifySearchBoxEmpty() {
        await this.page.waitForSelector('input[name="name"]', { timeout: 10000 });
    }

    async verifyError() {
        await this.page.waitForSelector('//span[@role="alert" and contains(@class, "validation--error")]');

        const errorMessageXPath = '//span[@role="alert" and contains(@class, "validation--error")]';
        try {
            await page.waitForSelector(errorMessageXPath, { state: 'visible' });
            console.log('Error message is visible.');
        } catch (error) {
            console.log('Error message is not visible.');
        }
    }

    async addName(name) {
        await this.page.fill('input[name="name"]', name);
    }

    async addNumber(number) {
        await this.page.fill('input[name="customerNumber"]', number);
    }

    async addEmail(email) {
        await this.page.fill('input[name="email"]', email);
    }

    async addNotes(notes) {
        await this.page.waitForSelector('textarea[name="note"]', { timeout: 10000 });
        await this.page.fill('textarea[name="note"]', notes);
    }

    async addVAT(vat) {
        await this.page.fill('input[name="vat"]', vat);
    }

    async clickCustomerMenu() {
        await this.page.locator('#UsersGroupSwitchButton').click();
    }

    async clickCustomer() {
        await this.page.getByRole('button', { name: 'bbmmn' }).click();
    }

    async verifyEmptyTable() {
        await new Promise(resolve => setTimeout(resolve, 5000))
        const ele = 'tbody.h-full.text-sm.whitespace-nowrap.divide-y.divide-gray-200'
        const tbodyElement = await this.page.locator(ele);
        const innerText = await tbodyElement.textContent();
        const isBodyEmpty = innerText.trim() === '';
        expect(isBodyEmpty).toBeTruthy();

    }

    async verifyPopulatedTable() {
        await this.clickCustomer()
        await new Promise(resolve => setTimeout(resolve, 8000))
        const ele = 'tbody.h-full.text-sm.whitespace-nowrap.divide-y.divide-gray-200'
        const tbodyElement = await this.page.locator(ele);
        const innerText = await tbodyElement.textContent();
        const isBodyEmpty = innerText.trim() === '';
        expect(isBodyEmpty).toBeFalsy();


    }
}

module.exports = {
    CustomerPage,
};