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
    const alerts = await db.collection('news');

    // let bulkArr: News[] = []
    
    let bulkArr = getLatest()

}

/* Get list of new News Articles from 'latest' page */
const getLatest = async () => {
    const newsArr: News[] = []
    const response = await fetch(`https://sachsenews.com/category/latest/`)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    $(" article[id] a.more-link ").each((i, el) => {
            let currenthref = $(el).attr('href')
            newsArr.push({ URL: currenthref })
    });
    console.log(newsArr)

    return newsArr;
}

/* Populate each index of array to be written to db with appropriate properties */
const newsArr = (bulkArr: News[]) => {
    return Promise.all (bulkArr.map(async (e, i)=> {
        return scrape(e)
    }))
  }

/* Populate individual news object with scraped data from individual news article*/
const scrape = async (n: News): Promise<News> => {
    const response = await fetch(n.URL!)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const alertType: string = $(" span.priority ").html()!
    const title: string = $(" span.priority + h2").text()!
    const body: string = $(" #alert-body p").html()!
    const createdAt = new Date()

    n = { ...n, title: title, type: alertType, body: body, createdAt: createdAt }
    return n
}

export default getNews