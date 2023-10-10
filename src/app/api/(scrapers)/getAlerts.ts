import * as cheerio from 'cheerio';
import clientPromise from '@/lib/mongodb';

export type Alert = {
    img?: {src: string, alt: string}
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

    let bulkArr: Alert[] = []
    
    /* Iterate through all numbered pages until failure */
    // for (let i = 1; ; i++) {
    //     const response = await fetch(`https://local.nixle.com/sachse-police-department?page=${i}`)
    //     if (response.status == 404) { break }
    //     const htmlString = await response.text()
    //     const $ = cheerio.load(htmlString)

    //     $(" li[id^='pub'] a[href^='https://nixle.us'] ").each((j, el) => {
    //         let currenthref = $(el).attr('href')
    //         bulkArr.push({ URL: currenthref })
    //     });
    // }

    const response = await fetch(`https://local.nixle.com/sachse-police-department`)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    $(" li[id^='pub'] a[href^='https://nixle.us'] ").each((j, el) => {
        let currenthref = $(el).attr('href')
        bulkArr.push({ URL: currenthref })
    });

    if (!await isUpToDate(bulkArr)) {
        bulkArr = await populateBulkArr(bulkArr)
        await bulkWrite(bulkArr)
        return bulkArr;
    }
    else {
        return null;
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

    const img = { src: $(" [property='og:image'] ").attr("content")!, alt: 'Sachse Police Department Logo'}
    const alertType: string = $(" span.priority ").html()!
    const title: string = $(" span.priority + h2").text()!
    const body: string = $(" #alert-body p").html()!
    let date: dateString = new dateString($(" #fullpubhd dl.last > dd").text()!)
    const createdAt = date.toDateObject()

    a = { ...a, title: title, img:img, type: alertType, body: body, createdAt: createdAt }
    return a
}

/* check if db needs to be updated */
const isUpToDate = async (arr: Alert[]): Promise<boolean> => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    return (await alerts.find({ URL: arr[0].URL }).toArray()).length != 0
}

/* Perform bulk write operation to db with scraped data */
async function bulkWrite(items: Alert[]) {
    if (items.length < 1) { return }
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    const ops = items.map((item: Alert) => ({
        updateOne: {
            filter: {
                URL: item.URL,
            },
            update: { $set: item },
            upsert: true
        }
    }));

    return await alerts.bulkWrite(ops);

  } 

export default getNewAlerts;