// loginHelper.js

const loginHelper = async (page, email, password, dashboardURL) => {
    await page.provideEmail(email); // Fix this line
    await page.setPassword(password);
    await page.clickCreate({
        timeout: 200000
    });
    await page.verifyContactEmail(email);
    await page.verifyRedirect(dashboardURL);
};

module.exports = loginHelper;
