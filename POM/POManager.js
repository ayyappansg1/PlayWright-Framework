const {APIUtil}=require('./APIUtil')
const {AutomationPractiseURL}=require('./AutomationPractiseURL')
const {Calendar}=require('./Calendar')
const {ClientLogin}=require('./ClientLogin')
const {ExcelUploadDownload}=require('./ExcelUploadDownload')
const {LoginPage}=require('./LoginPage')

class POManager{
    constructor(page,context){
        this.page=page
        this.context=context
        //this.APIUtil=new APIUtil()
        //this.AutomationPractiseURL=new AutomationPractiseURL()
        //this.Calendar=new Calendar()
        //this.ClientLogin=new ClientLogin()
        //this.ExcelUploadDownload=new ExcelUploadDownload()
        this.LoginPage=new LoginPage(this.page,this.context)
    }
    // getAPIUtil(){
    //     return this.APIUtil
    // }
    // getAutomationPractise(){
    //     return this.AutomationPractiseURL
    // }
    // getCalendar(){
    //     return this.Calendar
    // }
    // getClientLogin(){
    //     return this.ClientLogin
    // }
    // getExcelUploadDownload(){
    //     return this.ExcelUploadDownload
    // }
    getLoginPage(){
        return this.LoginPage
    }

}
module.exports={POManager}

