const { Before, After,Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

Before(async function () {
    this.browser=await chromium.launch({
        headless:false
    })
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (result) {
    console.log("dummy");
    if(result.status===Status.FAILED){
        await this.page.screenshot({path:'anothersangar.png'})
    }
});
