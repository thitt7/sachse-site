import puppeteer from "puppeteer"

const pageObject = {
    url: 'https://support.newedgeservices.com/cwd/',
    formSelector: 'input[id*="mui"]',
    suggestionSelector: '.MuiAutocomplete-popper ul',
    resultSelector: '',
    calendarSelector: ''
}

const resolvePromise = async () => {
    let sumPromise = new Promise(function (resolve, reject) {
       setTimeout(function () {
          resolve("blah");
       }, 1000);
    });
    let result = await sumPromise;
 }

const getTrash = async (address: string) => {
    const {url, formSelector, suggestionSelector, resultSelector, calendarSelector} = pageObject

    const browser = await puppeteer.launch({
        headless: false
    });

    console.log('address set to: ', address)

    const page = await browser.newPage();
    await page.goto(url);
    await page.focus(formSelector)
    await page.keyboard.type(address)
    // const p1 = await page.type(formSelector, address);
    // await page.$eval(formSelector, (el: any) => el.value = 'as;dlfkjasd');
    const p2 = await page.waitForSelector(suggestionSelector, {timeout: 5000});
    await resolvePromise()
    
    // const p3 = await page.keyboard.press('Enter')

    const content = await page.content()
    // console.log(content)

}

export default getTrash