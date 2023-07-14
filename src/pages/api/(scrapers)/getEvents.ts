import * as cheerio from 'cheerio';
import clientPromise from '../../../lib/mongodb';
import slugify from "slugify";

export type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    date?: Date,
    time?: {start: Date, end?: Date},
    URL?: string,
    img?: {src: string, alt: string}
}

const getEvents = async () => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('events');
    
    console.log('in events scraper')
    let bulkArr = await getLatest();
    bulkArr = await populateEventArr(bulkArr);

    // console.log(bulkArr)

    // await bulkWrite(bulkArr);

}

/* Get list of new News Articles from 'latest' page */
const getLatest = async () => {
    const now = new Date()
    let currentDate = now.toLocaleString()
    const startDate = currentDate.slice(0,currentDate.indexOf(','))
    const endDate = new Date(new Date().setFullYear(now.getFullYear()+2)).toLocaleString().slice(0,currentDate.indexOf(','))

    const eventArr: Event[] = []
    const response = await fetch(`https://www.cityofsachse.com/calendar.aspx?Keywords=&startDate=${startDate}&enddate=${endDate}`)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

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
    const date: Date = new Date($(" [id*='dateDiv'] ").text()!.trim());
    const time = { start: new Date($(" [id*='time'] .specificDetailItem ").text()!), end: new Date() }
    const location: string = $(" [id*='location'] .specificDetailItem [itemprop='name'] ").text()!.replace(/\t|\r|\n/gm, "");
    const address: string = $(" [id*='Address'] .specificDetailItem [itemprop='address']").html()!

    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})

    const dates = $(" [id*='dateDiv'] ").text().replace(/\u00A0/gm, " ").split('-')
    const times = $(" [id*='time'] .specificDetailItem ").text().replace(/\u00A0/gm, "-").split('-').map((e: string, i: number, a)=>{
        if (a[0].trim() == "All Day") {
            if (i == 0) {return "12:00 AM"}
            else if (i == 1) {return "11:59 PM"}
        }
        return e.trim()
    })

    console.log(times)
    // console.log('start date: ', new Date(dates[0].trim()))
    dates[1] ? console.log('end date: ', new Date(dates[1].trim())) : ''

    console.log('start time:', times[0])
    // console.log('end time:', times[1].trim())
    
    e = { ...e, title: title, date: date, time: time, location: location, address: address }
    return e;
}

export default getEvents;