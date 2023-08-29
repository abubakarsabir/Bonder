const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");
const { CustomerPage } = require("../pages/customer.page");



test.describe("Customer Test Cases", () => {
  let page;
  let loginPage;
  let customerPage;
  let contactsPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    customerPage = new CustomerPage(page);
    contactsPage = new ContactsPage(page);
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.setEmail(process.env.EMAIL);
    await loginPage.setPassword(process.env.PASSWORD);
    await loginPage.clickLogin({
      timeout: 200000,
    });
  });

  test.afterAll(async () => {
    await page.close();
  });

  // test.beforeEach(async () => {
  //   loginPage = new LoginPage(page);
  //   await loginPage.navigate();
  //   await loginPage.setEmail(process.env.EMAIL);
  //   await loginPage.setPassword(process.env.PASSWORD);
  //   await loginPage.clickLogin({
  //     timeout: 200000,
  //   });
  // });

  test("Create Customer", async () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const randomEmail = `test${randomSuffix}@vertical.codes`;
    const randomln = `te${randomSuffix}`;
    await customerPage.clickNewCustomer();
    await customerPage.verifySearchBoxEmpty();
    await contactsPage.clickCreate();
    await customerPage.verifyError();
    await customerPage.addName(randomln);
    await customerPage.addNumber('12345');
    await contactsPage.clickCreate();
    await customerPage.addEmail(randomEmail);
    await customerPage.addVAT('12345');
    await customerPage.addNotes(process.env.NOTES);
    await contactsPage.clickSave();
    await customerPage.clickCustomerMenu();
    await customerPage.clickCustomer();
    await customerPage.verifyEmptyTable();
    await customerPage.verifyPopulatedTable();
  })

  test('Edit Customer', async () => {
    await customerPage.clickCustomerMenu();
    await customerPage.clickEditButton();
    await customerPage.setAddress();
    await customerPage.saveEditCustomer();
    await customerPage.searchCustomer();
    await customerPage.searchExistingCustomer();
    await customerPage.clickEditButton();
    await customerPage.addCustomer();
    await customerPage.clickSaveddedCustomerButton();
    await customerPage.saveAddedCustomer();
    await customerPage.verifyContactAdded();
    await customerPage.clickEditButton();
  })

});
