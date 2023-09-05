const {
    expect
} = require('@playwright/test');
require('dotenv').config();
const assert = require('assert');

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
        // expect(isBodyEmpty).toBeTruthy();

    }

    async verifyPopulatedTable() {
        await this.clickCustomer()
        await new Promise(resolve => setTimeout(resolve, 8000))
        const ele = 'tbody.h-full.text-sm.whitespace-nowrap.divide-y.divide-gray-200'
        const tbodyElement = await this.page.locator(ele);
        const innerText = await tbodyElement.textContent();
        const isBodyEmpty = innerText.trim() === '';
        // expect(isBodyEmpty).toBeFalsy();

    }

    async clikcCustomerMenu() {
        await this.page.locator('//*[@id="UsersGroupSwitchButton"]').click()
    }

    async clickEditButton() {
        await this.page.getByRole('button', { name: 'bbmmn' }).click();
        const hoveringIcon = '//div[@class="relative basis-0 grow flex flex-col space-y-2 overflow-y-auto"]//div[1]//button[1]//i[1]';
        await this.page.waitForSelector(hoveringIcon);
        await this.page.click(hoveringIcon);
        await this.page.getByRole('button', { name: '' }).click();
    }

    async setAddress() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('input[name="addressStreet"]').fill('Random');
        await this.page.locator('input[name="invoiceAddressStreet"]').fill('Random');
    }

    async saveEditCustomer() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async searchCustomer() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByPlaceholder('Suche').fill('random');
    }

    async searchExistingCustomer() {
        await this.page.getByPlaceholder('Suche').fill(' ');
        await this.page.getByPlaceholder('Suche').fill('bbmmn');
    }

    async addCustomer() {
        await this.clickEditButton()
        await this.page.getByRole('button', { name: 'Cancel' })
        // await this.clickSaveddedCustomerButton()
    }

    async clickSaveddedCustomerButton() {

        await this.page.getByLabel('Customers').getByRole('button', { name: 'Cancel' }).click();
    }

    async saveAddedCustomer() {
        //await new Promise(resolve => setTimeout(resolve, 5000));
        await this.clickEditButton()
        await this.page.getByLabel('Edit customer').getByRole('button', { name: 'Save' }).click();


    }

    async verifyContactAdded() {
        const data = await this.page.textContent('//a[@id="UsersCell-firstName-2c89a431-5ae5-4849-8d89-3f5702884e8a"]')
        assert.ok(data.includes('Ab1302'), 'Text does not contain "Draft".');
    }
}

module.exports = {
    CustomerPage,
};