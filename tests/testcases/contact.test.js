const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");

test.describe("Contacts Test Cases", () => {
  let page;
  let loginPage;
  let contactsPage;
  const randomSuffix = Math.floor(Math.random() * 10000);
  const randomEmail = `test${randomSuffix}@vertical.codes`;
  const randomfn = `Ab${randomSuffix}`;
  const randomln = `te${randomSuffix}`;
  const randompn = `123${randomSuffix}`;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    contactsPage = new ContactsPage(page);
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
  //   contactsPage = new ContactsPage(page);
  //   await loginPage.navigate();
  //   await loginPage.setEmail(process.env.EMAIL);
  //   await loginPage.setPassword(process.env.PASSWORD);
  //   await loginPage.clickLogin({
  //     timeout: 200000,
  //   });
  // });

  // test.afterEach(async ()=>{
  //   await loginPage.logOut();
  // })

  test("Create Contact", async () => {
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
    await contactsPage.clickCloseSlideOver();
    await contactsPage.verifySlideOverClosed();
    await contactsPage.typeContactToSearch(randomfn);
    await contactsPage.verifyNewContactAdded(randomfn, randomln)
  });

  test("Edit Contact", async () => {
    await contactsPage.applyFilter();
    await contactsPage.applyFilter();
    const fname= await contactsPage.get1stName();
    const sname= await contactsPage.get2ndName();
    await contactsPage.openData();
    // await contactsPage.openContactToEdit(randomfn);
    // // await contactsPage.verifySlideOverData(process.env.FIRST_NAME, process.env.LAST_NAME, process.env.CUSTOMER_EMAIL, '12345');

    await contactsPage.addStreet(process.env.STREET);
    await contactsPage.addHousenumber(process.env.HOUSE_NUMBER);
    await contactsPage.addCity(process.env.CITY);
    await contactsPage.addPostalcode(process.env.ZIP_CODE);
    await contactsPage.addNotes(process.env.NOTES);
    await contactsPage.clickSave();
    await contactsPage.clickCloseSlideOver();
    // await contactsPage.verifySlideOverClosed();
    await contactsPage.typeContactToSearch(fname);
    await contactsPage.verifyNewContactAdded(fname,sname);
  });

  test("Search Contact", async () => {
    await contactsPage.typeContactToSearch("test");
    await contactsPage.applyFilter();
    await contactsPage.verifyContactAppeared();
    await contactsPage.clearSearch();
    const fname= await contactsPage.get1stName();
    const sname= await contactsPage.get2ndName();
    await contactsPage.applyFilter();
    await contactsPage.applyFilter();
    await contactsPage.verifyFilterCleared(fname);
  })


});