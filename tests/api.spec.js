const {
    test,
    expect,
    request
} = require('@playwright/test')
const {
    APIUtils
} = require('./Utils/APIUtils')
const {
    APIUtil
} = require('../POM/APIUtil')


const loginPayLoad = {
    userEmail: "ayyappansg1@gmail.com",
    userPassword: "Ayya@1995"
}
const createOrderPayLoad = {
    orders: [{
        "country": "British Indian Ocean Territory",
        "productOrderedId": "6581cade9fd99c85e8ee7ff5"
    }]
}
var responseProp
//var webContext
let token
test.describe.configure({mode:"serial"})
test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const apiUtils = new APIUtils(apiContext, loginPayLoad)
    responseProp = await apiUtils.createOrder(createOrderPayLoad)

})

test('@API API Create order Test', async ({
    browser
}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const apiUtil = new APIUtil(page)
    await apiUtil.feedTokenInSession(responseProp)
    await apiUtil.goToApplication()
    await apiUtil.verifyGeneratedIdthroughAPIWithUI(responseProp)
})

test("Cookie Inject", async ({
    browser
}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const apiUtil = new APIUtil(browser, page, context)
    await apiUtil.goToApplication()
    await apiUtil.validLogin()
    const webContext = await apiUtil.sessionStorage()
    await apiUtil.goToApplicationWithWebContext(webContext)
})

test('@API API interrupt response', async ({
    browser
}) => {
    const fakePayload = {
        data: [],
        message: "No orders"
    }
    const context = await browser.newContext()
    const page = await context.newPage()
    const apiUtil = new APIUtil(browser, page, context)
    await apiUtil.feedTokenInSession(responseProp)
    await apiUtil.goToApplication()
    await apiUtil.interruptResonse(fakePayload)
    await apiUtil.verifyMyOrdersAfterIntercept()
})


test("Interrupt request", async ({
    browser
}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const apiUtil = new APIUtil(browser, page, context)
    await apiUtil.feedTokenInSession(responseProp)
    await apiUtil.goToApplication()
    await apiUtil.interruptRequest(responseProp)

    //await page.goto("https://rahulshettyacademy.com/client/dashboard/order-details/6631dfd1a86f8f74dcd3dee2")

})

test("other stuffs", async ({
    browser
}) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    const apiUtil = new APIUtil(browser, page, context)

    await apiUtil.printRequestURL()
    await apiUtil.printResponseStatus()
    await apiUtil.abortImage()
    await apiUtil.goToApplication()
    await apiUtil.entirePageScreenshot()

})