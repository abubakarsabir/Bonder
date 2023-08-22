const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");
const {ProductPage} = require("../pages/product.page");
const {CustomerPage} = require("../pages/customer.page");
const { timeout } = require("../../playwright.config");

test.describe("Product Test Cases", () => {
  let page;
  let loginPage;
  let contactsPage;
  let productPage;
  let customerPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    productPage = new ProductPage(page);
    contactsPage = new ContactsPage(page);
    customerPage = new CustomerPage(page);
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


    test('Create Product Group',async () =>{
        const randomSuffix = Math.floor(Math.random() * 10000);
        const randomln = `te${randomSuffix}`;

        await productPage.openMenu();
        await productPage.clickNewProductGroups();
        await contactsPage.clickCreate();
        await customerPage.verifyError(); 
        await productPage.addName(randomln);
        await contactsPage.clickCreate();
        await productPage.verifyProductSaved();
        await productPage.closeSlider();
        await productPage.verifyProductAppeared(randomln);
    })

    test('Edit Product Group', async () =>{
        const randomSuffix = Math.floor(Math.random() * 10000);
        const randomln = `te${randomSuffix}`;
        const randomdescription = `test${randomSuffix}vertical.codes`;

        await productPage.openMenu();
        await productPage.openProduct();
        await productPage.addDescription(randomdescription);
        await contactsPage.clickSave();
        // await contactsPage.verifySlideOverClosed();
        await productPage.addImage();
        // await productPage.clickNewContent();
        await productPage.openImageBox();
        await productPage.selectImage();


    })

    test('Create Product', async () => {

        const randomSuffix = Math.floor(Math.random() * 10000);
        const randomln = `te${randomSuffix}`;
        const randomdescription = `test${randomSuffix}vertical.codes`;

        await productPage.openMenu();
        await productPage.clickProductsOption();
        await productPage.clickNewProductButton();
        await contactsPage.clickCreate();
        await customerPage.verifyError();
        await productPage.addProductName(randomln);
        await contactsPage.clickCreate();
        await contactsPage.clickSave();
        await productPage.closeProductSlider();
        await contactsPage.verifySlideOverClosed();
    })

    test ('Search Product', async () => {
        await productPage.openMenu();
        await productPage.clickProductsOption();
        await productPage.searchNonExistingProduct();
        await productPage.searchExistingProduct();
        await productPage.clickFilter();
        await productPage.checkFilterApplied();
        await productPage.clickFilter();
        await productPage.checkFilterCleared();
    })

    test ('Create New Product Item', async () =>{
        await contactsPage.verifySlideOverClosed();

        await productPage.openMenu();
        await productPage.clickOnProductItem();
        await productPage.addNewProductItem();
        await productPage.clickCreateButton();
        await productPage.verifyNameError();
        await productPage.clickProductDropDown();
        await productPage.clickProductItem();
        await contactsPage.clickCreate();
        await contactsPage.clickSave();
        await productPage.closeProductSlider();
        await contactsPage.verifySlideOverClosed();
        await productPage.checkProduct();
        await productPage.clickDeleteButton();
        await productPage.confirmDelete();
    })

    test ('Search Product Item', async () => {
        await productPage.openMenu();
        await productPage.clickOnProductItem();
        await productPage.searchNonExistingProductItem();
        await productPage.searchExistingProductItem();
        await productPage.clickFilterProductItem();
        await productPage.checkFilterAppliedProductItem();
        await productPage.clickFilterProductItem();
    })

    test ('Search Product Group', async () => {
        await productPage.openMenu();
        await productPage.searchNonExistingProductGroup();
        await productPage.searchExistingProductGroup();
        await productPage.clickFilterProductItem();
        await productPage.checkFilterAppliedProductGroup();
        await productPage.clickFilterProductItem();
    })

    test('Edit Product Item', async () => {
        await productPage.openMenu();
        await productPage.clickOnProductItem();
        await productPage.selectItemToEdit();
        await productPage.addImage();
        await productPage.createNewContent();
        await productPage.uploadImage();
        await productPage.saveUploadedfile();
        await productPage.savePicture();
        await productPage.saveFinalChanges();
        await productPage.selectItemToEdit();
        await productPage.clearImage();
    })

    test('Edit Product', async () => {
        await productPage.openMenu();
        await productPage.navigateToProducts();
        await productPage.chooseProduct();
        await productPage.setProductAttributes();
        await productPage.addImage();
        await productPage.createNewContent();
        await productPage.uploadProductImage();
        await productPage.saveUploadedfile();
        await productPage.savePicture();
        await productPage.setUnitValue();
        await productPage.clearImage();
        await productPage.saveChanges();

    })
});