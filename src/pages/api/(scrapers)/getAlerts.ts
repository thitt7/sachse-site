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

    // let bulkArr: Alert[] = []
    let bulkArr: Alert[] = [
        { URL: 'https://nixle.us/EAKB5' },
        { URL: 'https://nixle.us/EAK8T' },
        { URL: 'https://nixle.us/EAK7D' },
        { URL: 'https://nixle.us/EANRM' },
    ]

    const examplefn = async () => {
        return ('logging debugging function')
    }
    
    /* Iterate through all numbered pages until failure */
//     for (let i=1; ; i++) {
//     const response = await fetch(`https://local.nixle.com/sachse-police-department?page=${i}`)
//     console.log('status is', response.status)
//     if (response.status == 404) {break}
//     const htmlString = await response.text()
//     const $ = cheerio.load(htmlString)
    
//     $(" li[id^='pub'] a[href^='https://nixle.us'] ").each((i, el) => {
//         let currenthref  = $(el).attr('href')
//         bulkArr.push({URL: currenthref})
//     });
// }

    // for (let i of bulkArr) {
    //     console.log(i.URL)
    //     let copy = {...i}
    //     i = {...copy}
    // }

    /* populate each object with scraped data */
    const populateBulkArr = async () => {
        // let promise = new Promise((resolve, reject) => {

        // })
        bulkArr.forEach(async (e, i ,a)=> {

            const response = await fetch(e.URL!)
            const htmlString = await response.text()
            const $ = cheerio.load(htmlString)
            
            const alertType: string = $(" span.priority.alert ").html()!
            const title: string = $(" span.priority.alert + h2").text()!
            const body: string = $(" #alert-body p").html()!
            let date: dateString = new dateString($(" #fullpubhd dl.last > dd").text()!)
            const createdAt = date.toDateObject()

            e = {...e, title : title, type: alertType, body: body, createdAt: createdAt}
            a[i] = {...e}
            console.log(bulkArr)
    })
    return bulkArr
    }

    populateBulkArr().then(async ()=> {
        let message = await examplefn()
        console.log(message)
    })
    
    // const copy = await populateBulkArr()
    // await bulkWrite(copy)

    async function bulkWrite(items: Alert[]) {
        await populateBulkArr()
        console.log('executing bulkwrite function')
        console.log('items is equal to: ',items)
    
        const alerts = await db.collection('alerts');
    
        const ops = items.map((item: Alert) => ({
            updateOne: {
                filter: {
                    title: item.title
                },
                update: { $set: item },
                upsert: true
            }
        }));
    
        return await alerts.bulkWrite(ops);
    
      }  

}

const getCurrentAlerts = () => {

}

export default getNewAlerts;