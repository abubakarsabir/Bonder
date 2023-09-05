const {
    expect
} = require('@playwright/test');
const assert = require('assert');
const path = require('path');
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

    async verifyProductAppeared(productName) {
        await this.searchExistingProductGroup(productName)
        const element = await this.page.locator("xpath=/html[1]/body[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[2]/div[5]/main[1]/section[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]");
        const text = await element.allTextContents();
        //console.log(text)
        expect(text).toContain(productName);
        //expect(productName).toBeTruthy();
    }

    async openProduct(Name) {

        await this.page.getByRole('link', { name: Name }).click();
    }

    async addDescription(description) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.waitForSelector('textarea[name="description-en"]');
        await this.page.fill('textarea[name="description-en"]', description);
    }

    async addImage() {
        //await this.page.locator('span.tag--content:has-text("ADD")').first().click();
        const button = await this.page.getByText('none ImagesADD').filter({hasText:'ADD'})
        await button.getByRole('button',{name: 'ADD'}).click()
    }

    async openImageBox() {
        await this.page.locator('id=addButton', { timeout: 5000 }).nth(3).click({ force: true });
    }

    async selectImage() {

        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.page.waitForSelector('//*[@id="uploadButton"]');
        await this.page.locator('//*[@id="uploadButton"]').click();
        //.setInputFiles('../../testfile.png');
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('testfile.png');

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
        //await this.page.waitForTimeout(4000)
        await this.page.getByRole('link', { name: 'te1213' }).toBeVisible()
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
        const firstTrElement = await this.page.waitForSelector('tr:nth-child(1)');
        await firstTrElement.isVisible() && await firstTrElement.innerText().then(text => text.includes('Draft'));

        // const linkText = await this.page.textContent('a#ProductsCell-state-822339be-e190-4131-9dc0-13e1ddc023d0');

        // // Assert that the text contains "Draft"
        // assert.ok(linkText.includes('Draft'), 'Text does not contain "Draft".');
    }

    async clickOnProductItem() {
        await this.page.getByRole('link', { name: 'Product items' }).click();
        await this.page.waitForTimeout(4000)
    }

    async addNewProductItem() {
        await this.page.locator('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[2]/button').click()
    }

    async verifyNameError() {
        await expect(this.page.getByText('Product is a required field')).toBeVisible();
    }

    async clickProductDropDown(productName) {
        await this.page.getByPlaceholder('No product selected').click()
        await this.page.waitForTimeout(4000);
        await this.page.getByPlaceholder('No product selected').fill('')
        //await this.page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/div[3]/div[1]/div[1]/div[1]/input[1]').fill('')
        //await this.page.locator('xpath=/html[1]/body[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/div[3]/div[1]/div[1]/div[1]/input[1]').fill(productName)
        //await this.page.getByLabel('New product item').locator('a').click();
        await this.page.click('ul[role="listbox"] li[role="option"]:first-child');
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
        await expect(inputValue).toBe(expectedValue);

    }

    async checkProduct() {
        //                                      await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByRole('link', { name: 'te1213' }).toBeVisible()
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

    async searchExistingProductItem(productName) {
        await this.page.fill('//*[@id="ProductItemSearchPhraseTextBox"]', '');
        await this.page.type('//*[@id="ProductItemSearchPhraseTextBox"]', productName);
        await this.page.waitForTimeout(4000)
    }

    async clickFilterProductItem(productName) {
        await this.searchExistingProductItem(productName)
        await this.page.getByRole('link', { name: productName }).click();
    }

    async checkFilterAppliedProductItem(productName) {
        await this.searchExistingProductItem(productName)
        const element = await this.page.locator('xpath=/html[1]/body[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[2]/div[5]/main[1]/section[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]');
        const text = await element.allTextContents();
        expect(text).toContain(productName);
    }

    async checkFilterClearedProductItem() {
        const linkText = await this.page.textContent('//*[@id="app"]/div[1]/div[4]/div/div/div[2]/div[5]/main/section[2]/div/div/div/table/tbody/tr[5]/td[7]');

        // Assert that the text contains "mno"
        assert.ok(linkText.includes('mno'), 'Text does not contain "mno".');
    }

    async clickCreateButton() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByRole('button', { name: 'Create' }).click();
        await this.page.waitForTimeout(4000)
    }

    async searchNonExistingProductGroup() {
        await this.page.fill('//*[@id="ProductgroupsSearchPhraseTextBox"]', 'random');
    }

    async searchExistingProductGroup(productName) {
        await this.page.fill('//*[@id="ProductgroupsSearchPhraseTextBox"]', ' ');
        await this.page.fill('//*[@id="ProductgroupsSearchPhraseTextBox"]', productName);
        await this.page.waitForTimeout(4000)
        
    }

    async checkFilterAppliedProductGroup(productGroupName) {
        await expect(this.page.getByText(productGroupName)).toBeVisible();
    }

    async selectItemToEdit(productItem) {
        await this.page.getByRole('link', { name: productItem }).click();
    }

    // async addImage() {
    //     const secondTableRow = await this.page.waitForSelector('table tbody tr:nth-child(2)');
    //     await secondTableRow.click();
    // }

    async uploadImage() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('input[name="nameen"]').fill('test');

        const fileInput = await this.page.$('input[type="file"]');
        const uploadButton = await this.page.$('#uploadButton');

        // Click the "Select file" button to trigger the file input dialog.
        await uploadButton.click();

        // Use the `input` method to set a file for the file input.
        await fileInput.setInputFiles('../bonder/testfile.pdf'); // Replace with the actual file path.
    }

    async saveUploadedfile() {
        await this.page.getByLabel('New content').getByRole('button', { name: 'Save' }).click({ timeout: 5 * 60 * 1000 });
    }

    async savePicture() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        // await this.page.getByLabel('Images').getByRole('button', { name: 'Save' }).click({timeout: 5 * 60 * 1000});
        // await this.page.getByLabel('New content').getByRole('button', { name: 'Save' }).click({timeout: 5 * 60 * 1000});
        await this.page.getByLabel('Images').getByRole('button', { name: 'Save' }).click();
        //await this.page.getByLabel('Edit product item').getByRole('button', { name: 'Save' }).click();
        //await this.closeSlider()
        await this.page.waitForTimeout(4000)
    }

    async saveFinalChanges() {
        await this.page.getByLabel('Edit product item').getByRole('button', { name: 'Save' }).click({ timeout: 5 * 60 * 1000 });
        await this.page.waitForTimeout(4000)
    }


    async clearImage() {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('#removeButton').click();
    }

    async navigateToProducts() {
        await this.page.getByRole('link', { name: 'Products', exact: true }).click();
        await this.page.waitForTimeout(4000)
    }

    async chooseProduct(productName) {
        await this.page.getByRole('link', { name: productName }).click();
    }

    async setProductAttributes() {
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('input[name="articlenumber"]').fill('12345');
        await this.page.locator('textarea[name="shortDescriptionen"]').fill('hello world');
        // await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async uploadProductImage() {
        await this.page.getByLabel('New content').locator('input[name="nameen"]').fill('test');
        const fileInput = await this.page.$('input[type="file"]');
        const uploadButton = await this.page.$('#uploadButton');

        // Click the "Select file" button to trigger the file input dialog.
        await uploadButton.click();

        // Use the `input` method to set a file for the file input.
        await fileInput.setInputFiles('../bonder/testfile.pdf'); // Replace with the actual file path.
    }

    async setUnitValue() {
        await this.page.locator('#headlessui-combobox-button-14 a').click();
        await this.page.getByText('Pieces').click();
        // await this.page.getByText('Pieces').click({timeout:50000});
        // await new Promise(resolve => setTimeout(resolve, 5000));
    }

    async saveChanges() {
        await this.page.getByRole('button', { name: 'Save' }).click({ timeout: 5 * 60 * 100 });
    }

    async removeUnitValue() {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('#headlessui-combobox-button-14 a').click();
        await this.page.getByText('Unknown').click();
    }

    async saveNewContent(){
        await this.page.fill('input[name="nameen"]', 'test data');
        await this.page.locator('#saveButton').nth(1).click({force: true});
    }
}

module.exports = {
    ProductPage,
};