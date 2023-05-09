import puppeteer, { ElementHandle, Page } from "puppeteer"
import clipboard from "clipboardy";

const pageObject = {
    url: 'https://support.newedgeservices.com/cwd/',
    formSelector: 'input[id*="mui"]',
    suggestionSelector: '.MuiAutocomplete-popper ul',
    resultSelector: '',
    calendarSelector: ''
}

const waitForSuggestion = async (address: string, page: Page) => {
    const ev = await page.$$eval('.MuiAutocomplete-popper ul li', els => {
        els.map((e) => {
            console.log(e)
            return e.innerText
        })
    });
    console.log(ev)

    return
}

const getTrash = async (address: string) => {
    const {url, formSelector, suggestionSelector, resultSelector, calendarSelector} = pageObject

    const browser = await puppeteer.launch({
        headless: false
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions('https://support.newedgeservices.com', ['clipboard-read', 'clipboard-write'])

    console.log('address set to: ', address)

    const page = await browser.newPage();
    await page.goto(url);
    // await page.focus(formSelector)
    // await page.keyboard.type(address)
    await clipboard.write(address)
    await page.bringToFront();
    const result = await page.evaluate(async () => {
    return navigator.clipboard.readText();
    });
    console.log('result: ', result)

    // const p1 = await page.type(formSelector, address);
    // await page.$eval(formSelector, (el: any) => el.value = `2814 Woodie Drive, Sachse, TX, USA`);

    await page.$eval(formSelector, (el: any) => {
        el.addEventListener("paste", (event: any) => {
            event.preventDefault();
          
            let paste = (event.clipboardData || window.Clipboard).getData("text");
            paste = paste.toUpperCase();
            const selection = window.getSelection();
            if (!selection!.rangeCount) return;
            selection!.deleteFromDocument();
            selection!.getRangeAt(0).insertNode(document.createTextNode(paste));
            selection!.collapseToEnd();
          });
    })

    const p2 = await page.waitForSelector(suggestionSelector, {timeout: 10000});
    
    // const p3 = await page.keyboard.press('Enter')

    const content = await page.content()

}

export default getTrash