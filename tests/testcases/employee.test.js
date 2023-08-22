const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");
const {EmployeePage} = require("../pages/employee.page");

test.describe("Employee Test Cases", () => {
  let page;
  let loginPage;
  let contactsPage;
  let employeePage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    employeePage = new EmployeePage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.beforeEach(async () => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.setEmail(process.env.EMAIL);
    await loginPage.setPassword(process.env.PASSWORD);
    await loginPage.clickLogin({
      timeout: 200000,
    });
  });

  test('Employee Role', async () => {
    await employeePage.clickEmployee();
    await employeePage.clickCustomers();
    await employeePage.selectCustomer();
    await employeePage.selectRole();
    await employeePage.addRole();
    await employeePage.addNewRole();
    await employeePage.saveNewRole();
    await employeePage.clickSave();
    await employeePage.clickEmployee();
    await employeePage.verifyEmployee();
    await employeePage.verifyAdmin();
    await employeePage.clearRole();
  })

});
