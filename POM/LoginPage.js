const {
    expect
} = require('@playwright/test')
class LoginPage {

    constructor(page,context) {
        this.page = page
        this.context=context
        this.username = page.locator("#username")
        this.password = page.locator("#password")
        this.signInButton = page.locator("#signInBtn")
        this.incorrectErrorMessage = page.locator("div.alert-danger")
        this.userRadioButton = page.locator("[value='user']")
        this.confirmButton = page.locator("#okayBtn")
        this.consultDropdown = page.locator("select.form-control")
        this.termsAndConditions = page.locator("#terms")
        this.products = page.locator("div.card-body")
        this.usernamePasswordText = page.locator("p.text-white b")
        this.blinkingTextElement=page.locator("[href*='request']")
    }

    async gotoApplicationAndVerifyURL() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
        expect(await this.page.url()).toContain("loginpagePractise")

    }
    async invalidLogin(username,password) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.signInButton.click()
        expect(await this.incorrectErrorMessage).toContainText("Incorrect")
    }

    async validLogin() {
        await this.username.clear()
        await this.password.clear()
        const username = await this.usernamePasswordText.first().textContent()

        await this.username.fill(username)
        const password = await this.usernamePasswordText.last().textContent()

        await this.password.fill(password)
        await this.userRadioButton.check()
        await this.confirmButton.click()
        expect(await this.userRadioButton).toBeChecked()
    }

    async studentDropdown() {
        const dropdown = await this.consultDropdown
        await dropdown.selectOption("consult")
    }
    async checkTermsAndConditionsAndCheckit() {
        expect(await this.termsAndConditions.isChecked()).toBeFalsy()
        await this.termsAndConditions.check()
        expect(await this.termsAndConditions).toBeChecked()
    }
    async clickSigninButton() {
        await this.signInButton.click()
        this.waitingForDom()


    }
    async waitingForDom() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
    }
    async selectProduct() {

        const allElements = await this.products
        await allElements.nth(1).waitFor()
        const count = await allElements.count()
        console.log("Count is " + count)
        let price;
        for (let k = 0; k < count; k++) {
            const elementText = await allElements.nth(k).locator("h4 a").textContent()

            if (elementText === "Nokia Edge") {
                price = await allElements.nth(k).locator("h5").textContent()
            }
        }
        console.log("Price of the nokia edge is " + price)
        console.log(typeof (price))
        price = await price.replace(/\$/g, '')
        let check
        if (parseFloat(price) > 4.55) {
            check = true;
        } else {
            check = false
        }
        expect(check).toBeTruthy()
    }
    async blinkingText() {
        await this.blinkingTextElement.waitFor()
        expect(await this.blinkingTextElement).toHaveAttribute("class", "blinkingText")
        const blinkingText = await this.blinkingTextElement
        const [newPage] = await Promise.all(

            [
                this.context.waitForEvent('page'),
                blinkingText.click()

            ]
        )
        expect(await newPage.url()).toContain("documents-request")
        let beforeEmail = await newPage.locator("p.red").textContent()
        let splitted = await beforeEmail.split("@")
        let firstHalf = splitted[0].split(" ")
        let secondHalf = splitted[1].split(" ")
        let wholetext = await firstHalf[firstHalf.length - 1] + "@" + secondHalf[0]
        await this.username.pressSequentially(wholetext)
    }

}


module.exports = {
    LoginPage
}