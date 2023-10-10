import * as cheerio from 'cheerio';
import slugify from "slugify";
import { isUpToDate } from './getEvents';

export type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    start?:  Date | string,
    end?:  Date | string,
    URL?: string,
    img?: {src: string, alt: string}
}

const getEvents2 = async () => {
    let eventArr: Event[] = [{}]
    const response = await fetch('https://www.sachsechamber.com/events/')
    let htmlString = await response.text()
    let $ = cheerio.load(htmlString)

    $(" a[href^=https://www.sachsechamber.com/events].mn-read-more ").each((i, el) => {
            eventArr.push({ URL: $(el).attr('href')! })
    });
    
    if (!await isUpToDate(eventArr)) {
        populateEventArr(eventArr).then(async (arr) => {
            console.log('events not up to date')
            console.log('arr: ',eventArr)
        })
        return eventArr;
    }
    else {
        return []
    }
    
}

/* Populate each index of array to be written to db with appropriate properties */
const populateEventArr = (bulkArr: Event[]) => {
    return Promise.all (bulkArr.map(async (e, i)=> {
        return scrape(e)
    }))
  }

/* Populate individual news object with scraped data from individual news article*/
const scrape = async (e: Event): Promise<Event> => {
    const response = await fetch(e.URL!)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const img = {src: $(" [itemprop='image'] ").attr("src")!, alt: ''}
    const title: string = $(" .mn-event-head:contains(Name:) + .mn-event-content ").text()!;
    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})
    const address: string = $(" .mn-event-content [itemprop='name'] ").html()!;
    const description = {html: $(" [itemprop='description'] ").html()!, text: $(" [itemprop='description'] ").text()!}
   
    const start: Date = new Date($(" [itemprop='startDate'] ").attr("content")!)
    const end: Date = new Date($(" [itemprop='endDate'] ").attr("content")!)
    
    e = { ...e, title: title, img: img, start: start, end: end, address: address, description: description }
    
    return e;
}

export default getEvents2;