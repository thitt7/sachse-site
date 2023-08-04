import * as cheerio from 'cheerio';
import slugify from "slugify";

export type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    date?: {start: Date, end?: Date},
    URL?: string,
    img?: {src: string, alt: string}
}

const getEvents2 = async () => {
    
    let bulkArr = await getLatest();
    bulkArr = await populateEventArr(bulkArr);
    return bulkArr;

}

/* Get list of new News Articles from 'latest' page */
const getLatest = async () => {

    /* Sachse Chamber Events */
    const eventArr: Event[] = []
    const response = await fetch('https://www.sachsechamber.com/events/')
    let htmlString = await response.text()
    let $ = cheerio.load(htmlString)

    $(" a[href^=https://www.sachsechamber.com/events].mn-read-more ").each((i, el) => {
            eventArr.push({ URL: $(el).attr('href') })
    });

    return eventArr;
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

    const title: string = $(" .mn-event-head:contains(Name:) + .mn-event-content ").text()!;
    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})
    const address: string = $(" .mn-event-content [itemprop='name'] ").html()!;
    const description = {html: $(" [itemprop='description'] ").html()!, text: $(" [itemprop='description'] ").text()!}

    // let dates = $(" [id*='dateDiv'] ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    // dates.length == 1 ? dates.push(dates[0]) : ''

    // let times = $(" [id*='time'] .specificDetailItem ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    // times.length == 1 && times[0].trim() !== "All Day" ? times.push(times[0]) : ''
    // if (times[0].trim() == "All Day") { times[0] = "00:00:01"; times.push("23:59:59") }
   
    const date = {start: new Date($(" [itemprop='startDate'] ").attr("content")!), end: new Date($(" [itemprop='endDate'] ").attr("content")!)}
    
    e = { ...e, title: title, date: date, address: address, description: description }
    console.log(e)
    return e;
}

export default getEvents2;