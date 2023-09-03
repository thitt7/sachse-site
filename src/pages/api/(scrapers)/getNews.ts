import * as cheerio from 'cheerio';
import clientPromise from '../../../lib/mongodb';
import slugify from "slugify";

export type News = {
    title?: string,
    slug?: string,
    author?: string,
    category?: string[],
    body?: {html: string, text: string},
    createdAt?: Date,
    URL?: string,
    img?: {src: string, alt: string}
}

const getNews = async () => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('news');
    
    let bulkArr = await getLatest();
    bulkArr = await populateNewsArr(bulkArr);
    await bulkWrite(bulkArr);

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

    return newsArr;
}

/* Populate each index of array to be written to db with appropriate properties */
const populateNewsArr = (bulkArr: News[]) => {
    return Promise.all (bulkArr.map(async (e, i)=> {
        return scrape(e)
    }))
  }

/* Populate individual news object with scraped data from individual news article*/
const scrape = async (n: News): Promise<News> => {
    const response = await fetch(n.URL!)
    const htmlString = await response.text()
    const $ = cheerio.load(htmlString)

    const title: string = $(" .et_pb_title_container .entry-title ").text()!
    const author: string = $(" .et_pb_title_meta_container .author ").text()!
    const category: string[] = []
    $(" .et_pb_title_meta_container a[rel='category tag']").each( function (i, e) { category.push($(e).text()!) })
    const body = { html: $(" .et_pb_post_content_0_tb_body ").html()!, text: $(" .et_pb_post_content_0_tb_body ").text()!.replace(/\t|\r|\n/gm, "")}
    const createdAt = new Date($(" head meta[property='article:published_time'] ").attr("content")!)
    const img = { src: $(" .et_pb_post_title_1_tb_body img ").attr("src")!, alt: $(" .et_pb_post_title_1_tb_body img ").attr("title")!}
    const slug: string = slugify(title, {remove: /[*+~.,()'"!:@]/g, lower: true})

    n = { ...n, title: title, author: author, category: category, body: body, createdAt: createdAt, img: img, slug: slug }
    return n
}

/* Perform bulk write operation to db with scraped data */
async function bulkWrite(items: any) {
    if (items.length < 1) { return }
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('news');

    const ops = items.map((item: News) => ({
        updateOne: {
            filter: {
                URL: item.URL,
                title: item.title,
            },
            update: { $set: item },
            upsert: true
        }
    }));

    return await alerts.bulkWrite(ops);

  }

export default getNews