const base=require('@playwright/test')

exports.customTest=base.test.extend({
    testDataForOrder:{
        username:"anshika@gmail.com",
        password:"Iamking@000",
        productTobeselected:"IPHONE 13 PRO"
    }
})