const exceljs = require('exceljs')
const {expect}=require('@playwright/test')

class ExcelUploadDownload {
    constructor(page) {
        this.page = page
        this.downloadButton=page.getByRole('button', {
            name: 'Download'
        })
        this.uploadButton=page.locator("#fileinput")
        this.successMessage=page.locator("//div[text()='Updated Excel Data Successfully.']")
        this.mango= page.getByText("Mango")
        this.rows=page.getByRole("row")
    }

    async goToApplication() {
        await this.page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")

    }
    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadButton.click()
        const download = await downloadPromise;
        const filePath = download.suggestedFilename()

        console.log("File path is " + filePath)
    }
    async uploadFileAndVerify(filepath){
        await this.uploadButton.setInputFiles(filepath)
        expect(await this.successMessage).toContainText("Updated Excel Data")
        const mainelement = await this.rows.filter({
          has: this.mango
        })
        expect(await mainelement.locator("#cell-4-undefined")).toContainText("350")
    }

    async writeExcel(searchText, replaceText, object, filepath) {

        const Workbook = await new exceljs.Workbook()
        await Workbook.xlsx.readFile(filepath)
        const worksheet = await Workbook.getWorksheet("Sheet1")
        const output = await this.readExcel(worksheet, searchText)
        const valueCell = await worksheet.getCell(output.row, output.columnnum + object.columnChange)
        valueCell.value = replaceText
        await Workbook.xlsx.writeFile(filepath)

    }

    async readExcel(worksheet, searchText) {
        let output = {
            row: -1,
            columnnum: -1
        }

        await worksheet.eachRow((row, rownumber) => {
            row.eachCell((cell, cellnumber) => {
                if (cell.value === searchText) {
                    output.row = rownumber
                    output.columnnum = cellnumber
                }
            })
        })
        return output
    }


}
module.exports={ExcelUploadDownload}