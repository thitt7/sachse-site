import puppeteer, { ElementHandle, Page } from "puppeteer"
import * as cheerio from 'cheerio';
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

const getTrash = async (address: string): Promise<string[][]> => {
    const tableContents: string[][] = [[],[],[],[]]
    const {url, formSelector, suggestionSelector, resultSelector, table} = pageObject

    const browser = await puppeteer.launch({
        headless: false
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions('https://support.newedgeservices.com', ['clipboard-read', 'clipboard-write'])

    const page = await browser.newPage();
    await page.goto(url);

    await clipboard.write(address)

    /* workaround to paste string rather than type */
    await page.focus(formSelector)
    await page.keyboard.down('Control')
    await page.keyboard.press('V')
    await page.keyboard.up('Control')

    await page.waitForSelector(suggestionSelector, {timeout: 10000});
    page.click(resultSelector)
    
    try {
        await page.waitForSelector('.MuiAccordion-root [role="region"] table', {timeout: 10000});
    }
    catch(e) {
        console.log('error', e)
    }

    const htmlString = await page.content()
    const $ = cheerio.load(htmlString)

    $('.MuiAccordion-root thead tr th').map((i, el) => { tableContents[0].push($(el).text()) });

    $('.MuiAccordion-root tbody tr').map((i, el) => {
        $(el).find('td').map((j, el) => { tableContents[i+1].push($(el).text()) })
    });
    await browser.close()
    return tableContents
}

export default getTrash