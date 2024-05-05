const exceljs = require('exceljs')

async function writeExcel(searchText,replaceText,object,filepath) {
    
    const Workbook = await new exceljs.Workbook()
    await Workbook.xlsx.readFile(filepath)
    const worksheet = await Workbook.getWorksheet("Sheet1")
    const output=await readExcel(worksheet,searchText)
    const valueCell=await worksheet.getCell(output.row,output.columnnum+object.columnChange)
    valueCell.value=replaceText
    await Workbook.xlsx.writeFile(filepath)

}

async function readExcel(worksheet,searchText) {
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
writeExcel("Mango","350",{rowchange:0,columnChange:3},"C://Users/ayyappan.g/Downloads/download.xlsx")

