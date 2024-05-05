const {
    test,expect
} = require('@playwright/test')
class ClientLogin {

    constructor(page) {
        this.page = page
        this.username = page.getByPlaceholder("email@example.com")
        this.password = page.getByPlaceholder("enter your passsword")
        this.loginButton = page.getByRole('button', {
            name: 'Login'
        })
        this.registerButton = page.locator("//a[text()='Register here']")
        this.productList = page.locator(".card-body")
        this.cartButton = page.locator("button[routerlink*='dashboard/cart']")
        this.selectedProduct = page.locator("div.cartSection h3")
        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        })
        this.creditCarNumber = page.locator("div.field input.text-validated")
        this.cvvNumber = page.locator("//div[text()='CVV Code ']//following-sibling::input")
        this.creditCardHoldername = page.locator("//div[text()='Name on Card ']//following-sibling::input")
        this.coupon = page.locator("//div[text()='Apply Coupon ']//following-sibling::input")
        this.applyCouponButton = page.locator("//button[text()='Apply Coupon']")
        this.couponStatus = page.getByText("* Coupon Applied")
        this.usernameChecking = page.locator("div.user__name label")
        this.countrySelection = page.locator("div.form-group input.text-validated")
        this.allCountries = page.locator(".ta-results button")
        this.completeOrderButton = page.locator("//a[text()='Place Order ']")
        this.successMessage = page.locator("td h1")
        this.orderIdUI = page.locator("tr.ng-star-inserted label")
        this.myorder = page.locator("label[routerlink*='myorders']")
        this.ordersListTable = page.locator("tr.ng-star-inserted")
        this.finalPageUsernameCountry = page.locator("//div[text()=' Billing Address ']//following-sibling::p[@class='text']")
        this.finalProductName = page.locator("div.title")
    }



    async goToApplicationAndVerify() {
        await this.page.goto("https://rahulshettyacademy.com/client/")
        expect(await this.page.url()).toContain("auth/login")

    }
    async validLoginAndVerifyNavigatedURL(username, password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.registerButton.scrollIntoViewIfNeeded()
        await this.loginButton.click()
        await this.productList.nth(1).waitFor()
        expect(await this.page.url()).toContain("dashboard")

    }
    async selectParticularProduct(productTobeselected) {
        let allElements = await this.productList
        console.log("elements size is " + await allElements.count())
        for (let k = 0; k < await allElements.count(); k++) {
            let first = await allElements.nth(k).locator("h5 b").textContent()
            if (first === productTobeselected) {
                await allElements.nth(k).getByRole('button', {
                    name: ' Add To Cart'
                }).click()
                break
            }
        }
    }
    async goToCart() {
        await this.cartButton.click()

    }
    async verifySelectedProductAndCheckout(productTobeselected) {
        expect(await this.selectedProduct).toContainText(productTobeselected)
        await this.checkoutButton.click()
    }
    async fillPaymentDetails(creditcardNumber, username) {
        await this.creditCarNumber.clear()
        await this.creditCarNumber.fill(creditcardNumber)
        expect(await this.usernameChecking).toContainText(username)
        await this.cvvNumber.fill("123")
        await this.creditCardHoldername.fill("Ayyappan")
        await this.coupon.fill("rahulshettyacademy")
        await this.applyCouponButton.click()
        await this.couponStatus.waitFor()
        expect(await this.couponStatus).toBeVisible()
        //await page.getByText("* Coupon Applied").waitFor()
        await this.countrySelection.type("Ind", 1)
        //await page.locator("div.form-group input.text-validated").fill("Indi")

        await this.allCountries.first().waitFor()
        const allCountriesText = await this.allCountries.allTextContents()
        const allemelements = await this.allCountries
        console.log("Count is " + allCountriesText.length)
        for (let k = 0; k < allCountriesText.length; k++) {
            if (await allemelements.nth(k).textContent() === " India") {
                await allemelements.nth(k).click()
                break
            }
        }
    }
    async completeOrder() {
        await this.completeOrderButton.click()

    }
    async orderSuccessPage() {
        await this.successMessage.waitFor()
        expect(await this.successMessage).toHaveText(" Thankyou for the order. ")
        const alltexts = await this.orderIdUI.allTextContents()
        console.log("Copied order ids" + alltexts[0])
        var orderids = []
        for (let l = 0; l < alltexts.length; l++) {
            var again = await alltexts[l].split(" ")
            console.log("0th index" + again[0])
            console.log("1st index " + again[1])
            orderids.push(again[2])
        }
        console.log("order id Array" + orderids)
        return orderids
    }

    async verifyOrderId(orderids) {
        await this.myorder.click()
        await this.page.locator("tr.ng-star-inserted th").nth(1).waitFor()
        const orderIds = await this.ordersListTable
        console.log("Order id count is " + await orderIds.count())
        let flag = false
        for (let m = 0; m < await orderIds.count(); m++) {
            let firstText = await orderIds.nth(m).locator('th').textContent()
            for (let k = 0; k < orderids.length; k++) {
                if (orderids[k] === firstText) {
                    flag = true
                    console.log("First text is " + firstText)
                    await orderIds.nth(m).locator('td button.btn-primary').click()
                    break
                }
            }

        }
        expect(flag).toBeTruthy()

    }
    async finalPage(username,productTobeselected) {

        expect(await this.finalPageUsernameCountry.first()).toContainText(username)
        expect(await this.finalPageUsernameCountry.nth(1)).toContainText("India")
        expect(await this.finalProductName).toContainText(productTobeselected)
    }



}
module.exports = {
    ClientLogin
}