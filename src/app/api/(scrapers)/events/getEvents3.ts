import * as cheerio from 'cheerio';
import slugify from "slugify";

type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    pubDate?: Date,
    start?: Date,
    end?: Date,
    URL?: string,
    img?: {src: string, alt: string}
}

const getEvents3 = async () => {
    
    let bulkArr = await getLatest();
    return bulkArr;

}

/* Get list of new News Articles from 'latest' page */
const getLatest = async () => {


    /* Collin College Events */
    let eventArr: Event[] = [];
    const response = await fetch('https://collin.campuslabs.com/engage/events.rss')
    let htmlString = await response.text()
    let $ = cheerio.load(htmlString)
    
    let Arr = $(' location ').filter((i, e) => {
        return $(e).text().toLowerCase().includes('wylie'.toLowerCase());
    });

    Arr.map((i, e) => {
        let event: Event = {}
        const el = $(e).closest(' item ')

        // console.log('NUM', i, $(e).parent().prop("outerHTML"))
        // console.log('NUM', i, el.find('title').text())

        const URL: string = el.find(" guid ").text()!;
        const img = {src: el.find(" enclosure ").attr("url")!, alt: ''}
        const title: string = el.find(" title ").text()!;
        const description = {html: el.find(" description ").html()!, text: el.find(" description ").text()!}
        description.html = description.html.replace(']]&gt;', '')
        console.log(description.html)
    
        const pubDate: Date = new Date(el.find(" pubDate ").text()!)
        const start: Date = new Date(el.find(" start ").text()!)
        const end: Date = new Date(el.find(" end ").text()!)

        event = { ...event, URL: URL, title: title, img: img, description: description, pubDate: pubDate, start: start, end: end }
       
        eventArr.push(event)
    });

    return eventArr;
    
}

export default getEvents3;