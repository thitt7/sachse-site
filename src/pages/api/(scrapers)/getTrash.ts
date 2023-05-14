import puppeteer, { ElementHandle, Page } from "puppeteer"
import clipboard from "clipboardy";

const pageObject = {
    url: 'https://support.newedgeservices.com/cwd/',
    formSelector: 'input[id*="mui"]',
    suggestionSelector: '.MuiAutocomplete-popper ul',
    resultSelector: '.MuiAutocomplete-popper ul li:first-of-type',
    table: {
        head: '.MuiAccordion-root thead tr th',
        rows: '.MuiAccordion-root'
    }
}

const getTrash = async (address: string) => {
    // const tableContents: string[][] = [[],[]]
    const {url, formSelector, suggestionSelector, resultSelector, table} = pageObject

    const browser = await puppeteer.launch({
        headless: false
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions('https://support.newedgeservices.com', ['clipboard-read', 'clipboard-write'])

    const page = await browser.newPage();
    await page.goto(url);

    // await page.focus(formSelector)
    // await page.keyboard.type(address)
    await clipboard.write(address)

    /* workaround to paste string rather than type */
    await page.focus(formSelector)
    await page.keyboard.down('Control')
    await page.keyboard.press('V')
    await page.keyboard.up('Control')

    await page.waitForSelector(suggestionSelector, {timeout: 10000});
    page.click(resultSelector)
    
    await page.waitForSelector('.MuiAccordion-root [role="region"] table');
    await page.$$eval('.MuiAccordion-root thead tr th', async (elements: HTMLElement[]) => {
        console.log('getting table data')
        // let Arr: string[] = []
        // Promise.all( elements.map(async (e, i) => {
        //     return Arr.push(e.innerText)
        // }));
        let Arr = Promise.all( elements.map(async (e, i) => {
            return e.innerText
        }));
        
        // tableContents[0] = Arr
        console.log(Arr)
      });

      const example = await page.$$('.MuiPaper-root')
      console.log(example[0].getProperty)

    const content = await page.content()

    // await browser.close()

}

export default getTrash