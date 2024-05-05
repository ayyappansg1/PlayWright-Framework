const {expect}=require('@playwright/test')


class Calendar{
    constructor(page){
        this.page=page
        this.calendarButton=page.locator("button.react-date-picker__calendar-button")
        this.yearSelectionButton= page.locator("button.react-calendar__navigation__label")
        this.decadeYearButton= page.locator("div.react-calendar__decade-view__years button")
        this.previousYearButton=page.locator("button.react-calendar__navigation__prev-button")
        this.monthButton=page.locator("div.react-calendar__year-view__months button")
        this.selectParticularMonth=page.locator("//div[@class='react-calendar__month-view__days']//button[not(contains(@class,'neighboringMonth'))]")
        this.selectedDateMonthValue=page.locator(".react-date-picker__inputGroup input:visible")

    }
    async goToApplication(){
        await this.page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")


    }
    async selectDate(month,year,date){
        await this.calendarButton.click()
        await this.yearSelectionButton.click()
        await this.yearSelectionButton.click()
        const allYears = await this.decadeYearButton
        const count = await allYears.count()
        console.log(count)
        let bool = false
        for (let k = 0; k < count; k++) {
          const first = await allYears.nth(k).textContent()
          if (first === year) {
            await allYears.nth(k).click()
            bool = true
            break
          }
        }
        let another = true
        while (another) {
          if (!bool) {
            if (parseInt(year) > 2030) {
      
            } else {
              const allYears = await this.decadeYearButton
              const count = await allYears.count()
              await this.previousYearButton.click()
              for (let k = 0; k < count; k++) {
                const first = await allYears.nth(k).textContent()
                if (first === year) {
                  await allYears.nth(k).click()
                  another = false
                  break
                }
              }
            }
          } else {
            another = false
          }
        }
      
        const allMonths = await this.monthButton
        const monthCount = await allMonths.count()
        for (let k = 0; k < monthCount; k++) {
          //const first = await allMonths.nth(k).textContent()
          if (k === parseInt(month) - 1) {
            await allMonths.nth(k).click()
            break
          }
        }
      
        const Alldays = await this.selectParticularMonth
        for (let k = 0; k < await Alldays.count(); k++) {
          const first = await Alldays.nth(k).textContent()
          if (first === date) {
            await Alldays.nth(k).click()
            break
          }
        }
      
        let total = [month, date, year]
        const allInputs = await this.selectedDateMonthValue
        for (let y = 0; y < await allInputs.count(); y++) {
          let first = await allInputs.nth(y).getAttribute('value')
          console.log(first)
          expect(first).toEqual(total[y])
        }
    }


}

module.exports={Calendar}