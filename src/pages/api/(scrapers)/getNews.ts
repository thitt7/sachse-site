import * as cheerio from 'cheerio';
import clientPromise from '../../../lib/mongodb'

export type News = {
    title?: string,
    type?: string,
    body?: string,
    createdAt?: Date,
    URL?: string
}

const getNews = async () => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    let bulkArr: News[] = []
    
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

}

export default getNews