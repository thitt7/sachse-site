import * as cheerio from 'cheerio';
import clientPromise from '../../../lib/mongodb';
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

const getEvents = async () => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('events');
    
    let bulkArr = await getLatest();
    bulkArr = await populateEventArr(bulkArr);
    // await bulkWrite(bulkArr);

}

/* Get list of new News Articles from 'latest' page */
const getLatest = async () => {
    const now = new Date()
    let currentDate = now.toLocaleString()
    const startDate = currentDate.slice(0,currentDate.indexOf(','))
    const endDate = new Date(new Date().setFullYear(now.getFullYear()+2)).toLocaleString().slice(0,currentDate.indexOf(','))

    /* City of Sachse Events */
    const eventArr: Event[] = []
    const response = await fetch(`https://www.cityofsachse.com/calendar.aspx?Keywords=&startDate=${startDate}&enddate=${endDate}`)
    let htmlString = await response.text()
    let $ = cheerio.load(htmlString)

    $(" a[id*='calendarEvent'] ").each((i, el) => {
            const currenthref = `https://www.cityofsachse.com${$(el).attr('href')}`
            eventArr.push({ URL: currenthref })
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

    const title: string = $(" h2[id*='eventTitle'] ").text()!;
    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})
    const location: string = $(" [id*='location'] .specificDetailItem [itemprop='name'] ").text()!.replace(/\t|\r|\n/gm, "");
    const address: string = $(" [id*='Address'] .specificDetailItem [itemprop='address']").html()!

    let dates = $(" [id*='dateDiv'] ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    dates.length == 1 ? dates.push(dates[0]) : ''

    let times = $(" [id*='time'] .specificDetailItem ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    times.length == 1 && times[0].trim() !== "All Day" ? times.push(times[0]) : ''
    if (times[0].trim() == "All Day") { times[0] = "00:00:01"; times.push("23:59:59") }
   
    const date = {start: new Date(`${dates[0]} ${times[0]}`), end: new Date(`${dates[1]} ${times[1]}`)}
    
    e = { ...e, title: title, date: date, location: location, address: address }
    console.log(e)
    return e;
}

export default getEvents;