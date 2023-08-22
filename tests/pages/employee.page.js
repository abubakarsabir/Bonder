const {
    expect
} = require('@playwright/test');
require('dotenv').config();
const assert = require('assert');

class EmployeePage {
    constructor(page) {
        this.page = page;
    }

    async clickEmployee(){
        await this.page.locator('//*[@id="SubMenu"]/a[2]/div[1]').click();
    }

    async verifyAdmin(){
        // await new Promise(resolve => setTimeout(resolve, 5000));
        await expect(this.page.getByText('Bonder').nth(0)).toBeVisible();
    }

    async clickCustomers(){
        await this.page.getByRole('link', { name: 'Customers' }).click();
    }

    async selectCustomer(){
        // await new Promise(resolve => setTimeout(resolve, 5000))
        await this.page.locator('//a[@id="UsersCell-firstName-7712009d-2e67-4b08-bbc4-0244f9c41eab"]').click();
    }

    async selectRole(){
        await new Promise(resolve => setTimeout(resolve, 5000))
        await this.page.getByRole('button', { name: 'ADD' }).nth(1).click();
    }
    
    async addRole(){
        await new Promise(resolve => setTimeout(resolve, 5000))
        await this.page.getByRole('button', { name: 'Roles add' }).click();
    }

    async addNewRole(){
        await this.page.locator('//*[@id="userroles7712009d-2e67-4b08-bbc4-0244f9c41eabCell-name-62c7fad2-15f8-40e4-b98d-b67ed3b78e4c"]').click();
    }

    async saveNewRole(){
        
        await this.page.getByLabel('Roles add', { exact: true }).getByRole('button', { name: 'Save' }).click();
    }

    async clickSave(){
        await this.page.locator('//*[@id="saveButton"]').nth(0).click();
        await new Promise(resolve => setTimeout(resolve, 5000))
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clearRole(){
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.page.getByRole('link', { name: 'Ab1581' }).click({timeout: 5 * 60 * 1000});
        await this.page.locator('#removeButton').click();
        await this.page.getByRole('button', { name: 'Save' }).click({timeout: 5 * 60 * 1000});
        await this.page.getByRole('button', { name: 'Close ' }).click({timeout: 5 * 60 * 1000});
    }

    async verifyEmployee(){
        await new Promise(resolve => setTimeout(resolve, 5000));
        await expect(this.page.getByText('Ab1581')).toBeVisible();
    }

}

 module.exports = {
        EmployeePage,
};