const { expect } = require("@playwright/test")

class APIUtils{

    constructor(apiContext,loginPayLoad){
        this.apiContext=apiContext
        this.loginPayLoad=loginPayLoad
    }

    async getToken(){
        const response=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:this.loginPayLoad
        })
        expect(await response.ok()).toBeTruthy()
        const jsonResponse=await response.json()
        //console.log(jsonResponse.token)
        return jsonResponse.token
    }
    async createOrder(createOrderPayload){
        let responseProperties={}
        responseProperties.token=await this.getToken()
        console.log(responseProperties.token)
        const orderCreationResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data:createOrderPayload,
        headers:
        {
            'Authorization':responseProperties.token,
            'Content-Type':'application/json'
        }
    })
    const jsonBody=await orderCreationResponse.json()
    console.log(jsonBody)
    responseProperties.orderId=await jsonBody.orders[0]
    expect(jsonBody.message).toEqual("Order Placed Successfully")
    return responseProperties
    }   
}
module.exports=({APIUtils})