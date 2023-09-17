import * as cheerio from 'cheerio';
import clientPromise from '../../../../lib/mongodb';
import slugify from "slugify";
import getEvents2 from './getEvents2';
import getEvents3 from './getEvents3';

export type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    start?: Date,
    end?: Date,
    URL?: string,
    img?: {src: string, alt: string},
    allDay?: boolean
}

const getEvents = async () => {
    
    let bulkArr = await getLatest();
    bulkArr = await populateEventArr(bulkArr);
    bulkArr.push(...await getEvents2(), ...await getEvents3())
    await bulkWrite(bulkArr);

}

/* Get list of events from city of sachse page from range of current date to current date + 2 years */
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
            const currenthref = `https://www.cityofsachse.com${$(el).attr('href')!.split('&')[0]}`
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

/* Populate individual event object with scraped data from individual event page*/
const scrape = async (e: Event): Promise<Event> => {
    const response = await fetch(e.URL!)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const img = {src: $(" [property='og:image'] ").attr("content")!, alt: ''}
    const title: string = $(" h2[id*='eventTitle'] ").text()!;
    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})
    const location: string = $(" [id*='location'] .specificDetailItem [itemprop='name'] ").text()!.replace(/\t|\r|\n/gm, "");
    const address: string = $(" [id*='Address'] .specificDetailItem [itemprop='address']").html()!
    let allDay: boolean = false;

    let dates = $(" [id*='dateDiv'] ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    dates.length == 1 ? dates.push(dates[0]) : ''

    let times = $(" [id*='time'] .specificDetailItem ").text().replace(/\u00A0/gm, " ").split('-').map((e:string)=>{return e.trim()})
    times.length == 1 && times[0].trim() !== "All Day" ? times.push(times[0]) : ''
    if (times[0].trim() == "All Day") { allDay = true; times[0] = "00:00:01"; times.push("23:59:59") }
   
    const start: Date = new Date(`${dates[0]} ${times[0]}`)
    const end: Date = new Date(`${dates[1]} ${times[1]}`)
    
    e = { ...e, title: title, img: img, start: start, end: end, location: location, address: address, allDay: allDay }
    return e;
}

/* Perform bulk write operation to db with scraped data */
async function bulkWrite(items: Event[]) {
    if (items.length < 1) { return }
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const events = await db.collection('events');

    const ops = items.map((item: Event) => ({
        updateOne: {
            filter: {
                URL: item.URL,
                // title: item.title,
            },
            update: { $set: item },
            upsert: true
        }
    }));

    return await events.bulkWrite(ops);

  } 

export default getEvents;