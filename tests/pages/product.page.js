const {
    expect
} = require('@playwright/test');
require('dotenv').config();


class ProductPage {
    constructor(page) {
        this.page = page;
    }

    async openMenu() {
        const submenuItemSelector = '//*[@id="SubMenu"]/div[2]/a';
        await this.page.locator(submenuItemSelector).click();
    }

    async clickNewProductGroups() {
        await this.page.locator('//*[@id="open-create-dialog-button"]').click();
    }

    async addName(name) {
        await this.page.fill('input[name="name-en"]', name);
    }

    async verifyProductSaved() {
        await this.page.locator('//*[@id="headlessui-dialog-title-40"]');
    }

    async closeSlider() {
        await this.page.locator('//*[@id="closeSlideOver"]').click();
    }

    async verifyProductAppeared(name) {
        const actualText = await this.page.textContent('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[5]/main/section[2]/div/div/div/table/tbody/tr[1]/td[3]');
        const expectedText = name;
        expect(actualText).toBeTruthy();
    }

    async openProduct() {

        await this.page.getByRole('link', { name: ',bjb,' }).click();
    }

    async addDescription(description) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.waitForSelector('textarea[name="description-en"]');
        await this.page.fill('textarea[name="description-en"]', description);
    }

    async addImage() {
        await this.page.getByRole('button', { name: 'ADD' }).first().click();
    }

    async openImageBox() {
        //await this.page.click('#addButton');
        // await this.page.getByAltText('New content').click();
        // await this.page.locator('#headlessui-dialog-title-18').isVisible();
        // await this.page.locator('id=addButton').nth(2).click();
        // const elementSelector = 'button';
        // const expectedText = 'New content';

        // // Wait for the element with the expected text to appear
        // await this.page.waitForSelector(`${elementSelector}:has-text("${expectedText}")`, {state: 'attached' });
        // await this.page.click(`${elementSelector}:has-text("${expectedText}")`);
       // await this.page.waitForTimeout(2000); // Wait for 1 second
        await this.page.getByRole('button', { name: 'New content' }).click()

    }

    async selectImage() {

        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.waitForSelector('//*[@id="uploadButton"]');
        await this.page.locator('//*[@id="uploadButton"]').click();
    }

    async clickNewContent() {
        const saveButton = await this.page.getByRole('button', {
            name: 'New content'
        });
        await saveButton.click();
    }

    async clickProductsOption() {
        await this.page.locator('//*[@id="SubMenu"]/a[2]').click();
    }

    async clickNewProductButton() {
        await this.page.locator('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[2]/button').click();
    }

    async addProductName(name) {
        await this.page.fill('input[name="nameen"]', name);
    }

    async closeProductSlider() {
        await this.page.getByRole('button', { name: 'Close ' }).click();
    }
}

module.exports = {
    ProductPage,
};