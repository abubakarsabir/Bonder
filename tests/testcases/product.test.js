const { test, expect } = require("@playwright/test");
const { ContactsPage } = require("../pages/contact.page");
const { LoginPage } = require("../pages/login.page");
const { ProductPage } = require("../pages/product.page");
const { CustomerPage } = require("../pages/customer.page");
const { timeout } = require("../../playwright.config");

const randomPSuffix = Math.floor(Math.random() * 10000);
const productGroupName = `te${randomPSuffix}`;
const productName = `te${randomPSuffix}`;

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
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.setEmail(process.env.EMAIL);
    await loginPage.setPassword(process.env.PASSWORD);
    await loginPage.clickLogin({
      timeout: 200000,
    })
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


  test('Create Product Group', async () => {
    //const randomSuffix = Math.floor(Math.random() * 10000);
    //const randomln = `te${randomSuffix}`;
    await productPage.openMenu();
    await productPage.clickNewProductGroups();
    await contactsPage.clickCreate();
    await customerPage.verifyError();
    await productPage.addName(productGroupName);
    await contactsPage.clickCreate();
    await productPage.verifyProductSaved(productGroupName);
    await productPage.closeSlider();
    await productPage.verifyProductAppeared(productGroupName);
  })

  test('Edit Product Group', async () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    //const randomln = `te${randomSuffix}`;
    const randomdescription = `test${randomSuffix}vertical.codes`;

    await productPage.openMenu();
    await productPage.searchExistingProductGroup(productGroupName);
    await productPage.openProduct(productGroupName)
    await productPage.addDescription(randomdescription);
    ////await contactsPage.clickSave();
    ////await contactsPage.verifySlideOverClosed();
    await productPage.addImage();
    await productPage.clickNewContent();
    ////await productPage.openImageBox();
    await productPage.selectImage();
    await productPage.saveNewContent();
    await productPage.savePicture()
    await productPage.saveFinalChangesProductGroup();

  })

  test('Create Product', async () => {

    const randomSuffix = Math.floor(Math.random() * 10000);
    const randomdescription = `test${randomSuffix}vertical.codes`;

    await productPage.openMenu();
    await productPage.clickProductsOption();
    await productPage.clickNewProductButton();
    await contactsPage.clickCreate();
    await customerPage.verifyError();
    await productPage.addProductName(productName);
    await contactsPage.clickCreate();
    await contactsPage.clickSave();
    await productPage.closeProductSlider();
    await contactsPage.verifySlideOverClosed();
    await productPage.searchExistingProduct(productName)
  })

  test('Search Product', async () => {
    await productPage.openMenu();
    await productPage.clickProductsOption();
    await productPage.searchNonExistingProduct();
    await productPage.searchExistingProduct();
    await productPage.clickFilter();
    await productPage.checkFilterApplied();
    await productPage.clickFilter();
    await productPage.checkFilterCleared();
  })

  test('Create New Product Item', async () => {
    
    await contactsPage.verifySlideOverClosed();

    await productPage.openMenu();
    await productPage.clickOnProductItem();
    await productPage.addNewProductItem();
    await productPage.clickCreateButton();
    await productPage.verifyNameError();
    await productPage.clickProductDropDown('te1213');
    //await productPage.clickProductItem();
    await productPage.clickCreateButton();
    // //await productPage.closeSlider();
    await productPage.closeProductSlider();
    // //await contactsPage.verifySlideOverClosed();
    //await productPage.checkProduct();
    // await productPage.clickDeleteButton();
    // await productPage.confirmDelete();
  })

  test('Search Product Item', async () => {
    await productPage.openMenu();
    await productPage.clickOnProductItem();
    await productPage.searchNonExistingProductItem();
    await productPage.searchExistingProductItem('te1213');
    //await productPage.clickFilterProductItem('te1213');
    await productPage.checkFilterAppliedProductItem('te1213');
    await productPage.clickFilterProductItem('te1213');
  })

  test('Search Product Group', async () => {
    await productPage.openMenu();
    await productPage.searchNonExistingProductGroup();
    await productPage.searchExistingProductGroup('te3352');
    //await productPage.clickFilterProductItem();
    await productPage.checkFilterAppliedProductGroup('te3352');
    //await productPage.clickFilterProductItem();
  })

  test('Edit Product Item', async () => {
    const productItemName = 'te1213'
    await productPage.openMenu();
    await productPage.clickOnProductItem();
    await productPage.searchExistingProductItem(productItemName)
    await productPage.selectItemToEdit(productItemName);
    await productPage.addImage();
    await productPage.clickNewContent()
    await productPage.uploadImage();
    await productPage.saveUploadedfile();
    await productPage.savePicture();
    //await productPage.saveFinalChanges();
    //await productPage.closeProductSlider()
    //await productPage.searchExistingProductItem(productItemName)
    //await productPage.selectItemToEdit(productItemName);

    await productPage.clearImage();
    await productPage.saveFinalChanges();
    await productPage.closeProductSlider()
  })

  test('Edit Product', async () => {
    await productPage.openMenu();
    await productPage.navigateToProducts();
    await productPage.chooseProduct('te1213');
    await productPage.setProductAttributes();
    await productPage.deleteProductImage()
    await productPage.addImage();
    await productPage.clickNewContent();
    await productPage.uploadProductImage();
    await productPage.saveUploadedfile();
    await productPage.savePicture();
    await productPage.setUnitValue();
    await productPage.clearImage();
    await productPage.removeUnitValue();
    await productPage.saveChanges();

  })
});