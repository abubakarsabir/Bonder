const {
    expect
} = require('@playwright/test');
const assert = require('assert');
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
        await this.page.locator('id=addButton', { timeout: 5000 }).nth(3).click({ force: true });
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

    async searchNonExistingProduct() {
        await this.page.type('#ProductsSearchPhraseTextBox', 'random');
    }

    async searchExistingProduct() {
        await this.page.fill('#ProductsSearchPhraseTextBox', '');
        await this.page.type('#ProductsSearchPhraseTextBox', 'te');
    }

    async clickFilter() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByRole('cell', { name: 'Status' }).click();
    }

    async checkFilterApplied() {
        await expect(this.page.getByText('Active')).toBeVisible();
    }

    async checkFilterCleared() {
        const linkText = await this.page.textContent('a#ProductsCell-state-822339be-e190-4131-9dc0-13e1ddc023d0');

        // Assert that the text contains "Draft"
        assert.ok(linkText.includes('Draft'), 'Text does not contain "Draft".');
    }

    async clickOnProductItem() {
        await this.page.getByRole('link', { name: 'Product items' }).click();
    }

    async addNewProductItem() {
        await this.page.locator('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[2]/button').click()
    }

    async verifyNameError() {
        await expect(this.page.getByText('Product is a required field')).toBeVisible();
    }

    async clickProductDropDown() {
        await this.page.getByLabel('New product item').locator('a').click();
    }

    async clickProductItem() {
        await this.page.getByLabel('New product item').getByText('sdfsdf').click();
    }

    async verifyStatus() {
        await new Promise(resolve => setTimeout(resolve, 5000));

        const inputSelector = ('#headlessui-combobox-input-33');

        const inputValue = await this.page.$eval(inputSelector, input => input.value);

        // Expected value to assert
        const expectedValue = 'Produced';
        await expect(inputValue).toBe('Produced');

    }

    async checkProduct() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByRole('checkbox').click();
    }

    async clickDeleteButton() {
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

    async confirmDelete() {
        await this.page.locator('//*[@id="confirmButton"]').click();
    }

    async searchNonExistingProductItem() {
        await this.page.fill('//*[@id="ProductItemSearchPhraseTextBox"]', 'random');
    }

    async searchExistingProductItem() {
        await this.page.fill('//*[@id="ProductItemSearchPhraseTextBox"]', '');
        await this.page.type('//*[@id="ProductItemSearchPhraseTextBox"]', 'te');
    }

    async clickFilterProductItem() {
        await this.page.getByRole('cell', { name: 'Name' }).click();
    }

    async checkFilterAppliedProductItem() {
        await expect(this.page.getByText('abc')).toBeVisible();
    }

    async checkFilterClearedProductItem() {
        const linkText = await this.page.textContent('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[5]/main/section[2]/div/div/div/table/tbody/tr[5]/td[7]');

        // Assert that the text contains "mno"
        assert.ok(linkText.includes('mno'), 'Text does not contain "mno".');
    }
}

module.exports = {
    ProductPage,
};