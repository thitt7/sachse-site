import * as cheerio from 'cheerio';
import clientPromise from '../../../lib/mongodb'

export type Alert = {
    title?: string,
    type?: string,
    body?: string,
    createdAt?: Date,
    URL?: string
}

class dateString extends String {
    name = ''

    constructor(name: string) {
        super(name)
        this.name = name;
    }

    toDateObject(): Date {

       const split = this.name.split(' ')

        /* parse proprietary date format to standard date string */
        const month = split[1]
        const date = split[2].slice(0, -3)
        const year = split[3]
        const time = split[6] == 'p.m.' ? `${(Number(split[5].split(':')[0]) + 12).toString()}:${split[5].split(':')[1]}` : split[5]
        
        return new Date(`${month} ${date}, ${year} ${time}`)
    }
}

const getNewAlerts = async () => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    let bulkArr: Alert[] = []
    
    /* Iterate through all numbered pages until failure */
    for (let i = 1; ; i++) {
        const response = await fetch(`https://local.nixle.com/sachse-police-department?page=${i}`)
        console.log('status is', response.status)
        if (response.status == 404) { break }
        const htmlString = await response.text()
        const $ = cheerio.load(htmlString)

        $(" li[id^='pub'] a[href^='https://nixle.us'] ").each((j, el) => {
            let currenthref = $(el).attr('href')
            bulkArr.push({ URL: currenthref })
        });
    }

    if (!await isUpToDate(bulkArr)) {
        console.log('updating...')
        populateBulkArr(bulkArr).then(async (arr) => {
            await bulkWrite(arr)
        })
    } 

}

/* Populate each index of array to be written to db with appropriate properties */
const populateBulkArr = (bulkArr: Alert[]) => {
    return Promise.all (bulkArr.map(async (e, i)=> {
        return scrape(e)
    }))
  }

/* Populate individual alert object with scraped data */
const scrape = async (a: Alert): Promise<Alert> => {
    const response = await fetch(a.URL!)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const alertType: string = $(" span.priority ").html()!
    const title: string = $(" span.priority + h2").text()!
    const body: string = $(" #alert-body p").html()!
    let date: dateString = new dateString($(" #fullpubhd dl.last > dd").text()!)
    const createdAt = date.toDateObject()

    a = { ...a, title: title, type: alertType, body: body, createdAt: createdAt }
    return a
}

/* check if db needs to be updated */
const isUpToDate = async (arr: Alert[]): Promise<boolean> => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');
    let oldAlert = []

    oldAlert = await alerts
        .find()
        .sort({ createdAt: -1 })
        .limit(1)
        .toArray()

    const newAlert = await scrape(arr[0])

    if (oldAlert[0] == undefined) {
        return false
    }
    else {
        return newAlert.URL == oldAlert[0].URL
    }
}

/* Perform bulk write operation to db with scraped data */
async function bulkWrite(items: Alert[]) {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    const ops = items.map((item: Alert) => ({
        updateOne: {
            filter: {
                title: item.title,
                URL: item.URL
            },
            update: { $set: item },
            upsert: true
        }
    }));

    return await alerts.bulkWrite(ops);

  } 

export default getNewAlerts;