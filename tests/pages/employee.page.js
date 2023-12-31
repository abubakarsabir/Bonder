const {
    expect
} = require('@playwright/test');
require('dotenv').config();
const assert = require('assert');

class EmployeePage {
    constructor(page) {
        this.page = page;
    }

    async clickEmployee() {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.locator('//*[@id="SubMenu"]/a[2]/div[1]').click();
    }

    async verifyAdmin() {
        //await this.page.waitForLoadState('networkidle');
        await expect(this.page.getByText('ADMINISTRATORS')).toBeVisible();
        //await this.clearRole()
    }

    async clickCustomers() {
        await this.page.getByRole('link', { name: 'Customers' }).click();
    }

    async selectCustomer() {
        await this.page.locator('.h-full tbody tr:nth-child(2)').click();
    }

    async selectRole() {
        await this.page.getByRole('button', { name: 'ADD' }).nth(1).click();
    }

    async addRole() {
        await this.page.getByRole('button', { name: 'Roles add' }).click();
    }

    async addNewRole() {
        await this.page.waitForLoadState('networkidle');
        const link = await this.page.waitForSelector('a:has-text("ADMINISTRATORS")');
        await link.click();
    }

    async saveNewRole() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByLabel('Roles add').getByRole('button', { name: 'Save' }).click()
        //await this.page.getByLabel('Roles add').getByRole('button', { name: 'Save' }).click();
        await expect(this.page.getByRole("heading", { name: "Roles add" })).not.toBeVisible();
    }

    async clickSave() {
        //await this.page.waitForLoadState('networkidle');
        await this.page.getByLabel('Roles').getByRole('button', { name: 'Save' }).click()
        await expect(this.page.getByRole("heading", { name: "Roles" })).not.toBeVisible();
        await this.page.waitForLoadState('networkidle')
        // await this.page.waitForTimeout(5000);  // waits for 2 seconds (2000 milliseconds)
        // const saveButtonLocator = this.page.locator('//*[@id="saveButton"]').nth(0);
        // await saveButtonLocator.isVisible();
        // await saveButtonLocator.click({ force: true });

        // await this.page.getByLabel('Roles').getByRole('button', { name: 'Save' }).click({timeout: 5*10*60});
        // await new Promise(resolve => setTimeout(resolve, 5000))
        // await this.page.getByRole('button', { name: 'Save' }).nth(0).click();
        // await this.page.getByLabel('Roles add').getByRole('button', { name: 'Close ' }).click({timeout: 5*10*60});
        // await new Promise(resolve => setTimeout(resolve, 5000))
    }

    async saveValue() {
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Save' }).click();
        // await this.page.getByRole('button', { name: 'Close ' }).click();
    }

    async clearRole() {
        //await new Promise(resolve => setTimeout(resolve, 5000));
        // await this.page.getByRole('link', { name: 'Ab1581' }).click({timeout: 5 * 60 * 1000});
        await this.page.locator('#removeButton').click();
        await this.page.getByRole('button', { name: 'Save' }).click({ timeout: 5 * 60 * 1000 });
        await this.page.getByRole('button', { name: 'Close ' }).click({ timeout: 5 * 60 * 1000 });
        await this.page.waitForTimeout(3000)
    }

    async verifyEmployee() {
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // await expect(this.page.getByText('Ab1581')).toBeVisible();
        await new Promise(resolve => setTimeout(resolve, 5000));

    }

}

module.exports = {
    EmployeePage,
};