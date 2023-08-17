const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");

test.describe("Contacts Test Cases", () => {
  let page;
  let loginPage;
  let contactsPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    contactsPage = new ContactsPage(page);
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

  test("Create Contact", async () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const randomEmail = `test${randomSuffix}@vertical.codes`;
    const randomfn = `Ab${randomSuffix}`;
    const randomln = `te${randomSuffix}`;
    const randompn = `123${randomSuffix}`;
    await contactsPage.clickNewContact();
    await contactsPage.setFirstName(randomfn);
    await contactsPage.setLastName(randomln);
    await contactsPage.setCustomerNumber(process.env.CUSTOMER_NUMBER);
    await contactsPage.clickCreate();

    await contactsPage.verifyValidationError(process.env.ERROR_MESSAGE);

    await contactsPage.setEmail(randomEmail);

    await contactsPage.setContactNumber(randompn);

    await contactsPage.clickCreate();


    await contactsPage.verifySlideOverData(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.CUSTOMER_EMAIL, '12345');
    await contactsPage.clickSave();

    await contactsPage.verifySlideOverClosed();
    // Add assertion to verify the new contact in the list.

    await contactsPage.verifyNewContactAdded(process.env.FIRST_NAME);
  });

  test("Edit Contact", async () => {
    await contactsPage.openContactToEdit();
    await contactsPage.verifySlideOverData(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.CUSTOMER_EMAIL, '12345');
    
    await contactsPage.addStreet(process.env.STREET);
    await contactsPage.addHousenumber(process.env.HOUSE_NUMBER);
    await contactsPage.addCity(process.env.CITY);
    await contactsPage.addPostalcode(process.env.ZIP_CODE);
    await contactsPage.addNotes(process.env.NOTES);
    await contactsPage.clickSave();
    await contactsPage.verifySlideOverClosed();

    

    await contactsPage.verifyNewContactAdded(process.env.FIRST_NAME);
  });

});