const {
    expect,
    request
} = require('@playwright/test')

class APIUtil {
    constructor(browser, page, context) {
        this.browser = browser
        this.page = page
        this.context = context
        this.myOrders = page.locator("button[routerlink='/dashboard/myorders']")
        this.orderTable = page.locator("tbody tr th")
        this.username = page.locator("#userEmail")
        this.password = page.locator("#userPassword")
        this.signinButton = page.locator("#login")
        this.product = page.locator(".card-body")
        this.noOrderText = page.locator("div.mt-4")
        this.orderIdOnly=page.locator("tbody tr")
        this.unAuthoriseText=page.locator("p.blink_me")
    }

    async feedTokenInSession(responseProp) {
        this.page.addInitScript(value => {
            window.localStorage.setItem('token', value)
        }, responseProp.token)
    }
    async goToApplication() {
        await this.page.goto("https://rahulshettyacademy.com/client")

    }
    async interruptRequest(responseProp){
        await this.myOrders.click()

        await this.page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
            async route => {
                route.continue({
                    url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6631dfd1a86f8f74dcd3dee2'
                })
            })
        await this.orderTable.first().waitFor()
        const orderIdFromUi = await this.orderIdOnly
        console.log("order count:" + await orderIdFromUi.count())
        for (let k = 0; k < await orderIdFromUi.count(); k++) {
            const first = await orderIdFromUi.nth(k).locator('th').textContent()
            if (first === responseProp.orderId) {
                await orderIdFromUi.nth(k).locator('td button.btn-primary').click()
                console.log("inside loop " + first)
            }
        }
        expect(await this.unAuthoriseText).toContainText("not authorize")
        
    }
    async interruptResonse(fakePayload) {
        await this.page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
            async route => {
                const response = await this.page.request.fetch(route.request())
                let body = JSON.stringify(fakePayload)
                route.fulfill({
                    response,
                    body
                })
            })
    }
    async verifyMyOrdersAfterIntercept() {
        await this.myOrders.click()
        //await page.locator("tbody tr th").first().waitFor()
        expect(await this.noOrderText).toContainText("No Orders")
    }
    async validLogin() {
        await this.username.fill("ayyappansg1@gmail.com")
        await this.password.fill("Ayya@1995")
        await this.signinButton.click()
        await this.product.nth(1).waitFor()
        expect(await this.page.url()).toContain("dashboard")
    }
    async sessionStorage() {
        await this.context.storageState({
            path: 'sangar.json'
        })
        const webContext = await this.browser.newContext({
            storageState: 'sangar.json'
        })
        return webContext
    }
    async goToApplicationWithWebContext(webContext) {
        const webPage = await webContext.newPage()
        await webPage.goto("https://rahulshettyacademy.com/client")

    }
    async verifyGeneratedIdthroughAPIWithUI(responseProp) {
        await this.myOrders.click()
        await this.orderTable.first().waitFor()
        const orderIdFromUi = await this.orderTable
        let result = false
        for (let k = 0; k < await orderIdFromUi.count(); k++) {
            const first = await orderIdFromUi.nth(k).textContent()
            if (first === responseProp.orderId) {
                result = true
            }
        }
        expect(result).toBeTruthy()
    }
    async printRequestURL(){
        this.page.on('request', request => console.log(request.url()))
    }
    async printResponseStatus(){
    this.page.on('response', response => console.log(response.statusText()))

    }
    async abortImage(){
        await this.page.route("**/*.{jpg,png,jpeg}",
        async route =>
            route.abort())
    }
    async entirePageScreenshot(){
        await this.page.screenshot({
            path: 'sangar.png'
        })
    }
    async particularElementScreenShort(){
        await this.signinButton.screenshot({
            path: 'another.png'
        })
    }
    async compareScreenshot(){
        expect(await this.page.screenshot()).toMatchSnapshot(('load.png'))

    }
}

module.exports = {
    APIUtil
}