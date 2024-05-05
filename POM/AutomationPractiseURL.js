const {
    expect
} = require('@playwright/test')

class AutomationPractice {
    constructor(page) {
        this.page = page
        this.hideBoxButton=page.locator("#hide-textbox")
        this.displayedText=page.locator("#displayed-text")
        this.alertButton=page.locator("#alertbtn")
        this.mouseHoverButton=page.locator("#mousehover")
        this.reloadOption=page.locator("//a[text()='Reload']")
        this.framePageAccess=page.frameLocator("#courses-iframe")
    }
    async goToApplication() {
        await this.page.goto("https://www.rahulshettyacademy.com/AutomationPractice/")
    }

    async performAcctions() {
        await this.hideBoxButton.click()
        expect(await this.displayedText).toBeHidden()

        this.page.on('dialog', dialog => {
            dialog.accept()
        })
        await this.alertButton.click()
        await this.mouseHoverButton.hover()
        await this.reloadOption.click()
    }
    async insideFrame(){

        const framepage = await this.framePageAccess
        await framepage.locator("//div[@class='header-upper']//li//a[text()='All Access plan']").click()
    }
}


module.exports = {
    AutomationPractice
}