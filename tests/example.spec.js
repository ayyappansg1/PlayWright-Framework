const {test,expect} = require("@playwright/test")
//const {customTest} = require('../POM/test-base')
const exceljs = require('exceljs')

const {
  LoginPage
} = require('../POM/LoginPage')
const {
  ClientLogin
} = require('../POM/ClientLogin')
const {
  Calendar
} = require('../POM/Calendar')
const {
  AutomationPractice
} = require('../POM/AutomationPractiseURL')
const {
  ExcelUploadDownload
} = require('../POM/ExcelUploadDownload')
const dataset = JSON.parse(JSON.stringify(require('./Utils/placeOrderTestData.json')))
const fs = require('fs')
const path = require('path')

//const exceljs = require('./Utils/excelUtils')
test.describe.configure({mode:"parallel"})
test("@web First Test", async ({
  browser
}) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginPage = await new LoginPage(page, context)
  await loginPage.gotoApplicationAndVerifyURL()
  await loginPage.invalidLogin()
  await loginPage.validLogin()
  await loginPage.studentDropdown()
  await loginPage.checkTermsAndConditionsAndCheckit()
  await loginPage.clickSigninButton()
  await loginPage.selectProduct()
  
})


test("@web second Test", async ({
  browser
}) => {
  const context = await browser.newContext()
  const page = await context.newPage()
  const loginPage = await new LoginPage(page, context)
  await loginPage.gotoApplicationAndVerifyURL()
  await loginPage.invalidLogin()
  await loginPage.validLogin()
  await loginPage.studentDropdown()
  //await loginPage.checkTermsAndConditionsAndCheckit()
  await loginPage.blinkingText()
})

test("Third ", async ({
  browser
}) => {
  const username = "anshika@gmail.com"
  const password = "Iamking@000"
  const productTobeselected = "IPHONE 13 PRO"
  const creditCarnumber = "4542 9931 9292 2293"
  const context = await browser.newContext()
  const page = await context.newPage()
  const clientLogin = new ClientLogin(page)
  await clientLogin.goToApplicationAndVerify()
  await clientLogin.validLoginAndVerifyNavigatedURL(username, password)
  await clientLogin.selectParticularProduct(productTobeselected)
  await clientLogin.goToCart()
  await clientLogin.verifySelectedProductAndCheckout(productTobeselected)
  await clientLogin.fillPaymentDetails(creditCarnumber, username)
  await clientLogin.completeOrder()
  const orderid = await clientLogin.orderSuccessPage()
  await clientLogin.verifyOrderId(orderid)
  await clientLogin.finalPage(username, productTobeselected)

})


test("Calendar", async ({
  page
}) => {
  const month = "10"
  const year = "2015"
  const date = "25"
  const calendar = new Calendar(page)
  await calendar.goToApplication()
  await calendar.selectDate(month, year, date)
})

test("alert", async ({
  page
}) => {
  const automationPractise = new AutomationPractice(page)

  await automationPractise.goToApplication()
  await automationPractise.performAcctions()
  await automationPractise.insideFrame()
})



test("Excel Upload and Download", async ({
  page
}) => {
  const filePath = "C://Users/ayyappan.g/Downloads/download.xlsx"
  //await download.saveAs(filePath);
  const excelFileUpload = new ExcelUploadDownload(page)
  await excelFileUpload.goToApplication()
  await excelFileUpload.downloadFile()
  await excelFileUpload.writeExcel("Mango", "350", {
    rowchange: 0,
    columnChange: 2
  }, filePath)
  await excelFileUpload.uploadFileAndVerify(filePath)

  await page.pause()
})