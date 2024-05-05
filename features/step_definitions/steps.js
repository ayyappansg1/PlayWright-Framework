const {
    POManager
} = require('../../POM/POManager')

const {Given,When,Then}=require('@cucumber/cucumber')
Given('the user Login To Application', {timeout:10000},async function () {
    this.POManager = await new POManager(this.page,this.context)
    this.loginPage = await this.POManager.getLoginPage()
    await this.loginPage.gotoApplicationAndVerifyURL()
});

When('the user enters {string} and {string}', async function (username, password) {
    await this.loginPage.invalidLogin(username, password)
});

Then('UI should show the error message', function () {
    console.log("I think passed")
});

When('the user enters grabs username and password from UI', async function () {
    await this.loginPage.validLogin()
});

Then('the user should select Product', async function () {
    await this.loginPage.studentDropdown()
    await this.loginPage.studentDropdown()
    await this.loginPage.checkTermsAndConditionsAndCheckit()
    await this.loginPage.clickSigninButton()
    await this.loginPage.selectProduct()

});