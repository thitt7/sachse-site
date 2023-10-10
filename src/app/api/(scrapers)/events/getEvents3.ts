import * as cheerio from 'cheerio';
import { isUpToDate } from './getEvents';
import slugify from "slugify";

type Event = {
    title?: string,
    slug?: string,
    location?: string,
    address?: string,
    description?: {html: string, text: string},
    pubDate?: Date | string,
    start?: Date | string,
    end?: Date | string,
    URL?: string,
    img?: {src: string, alt: string}
}

const getEvents3 = async () => {
    
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

        const URL: string = el.find(" guid ").text()!;
        const img = {src: el.find(" enclosure ").attr("url")!, alt: ''};

        const regex = /<!\[CDATA\[(.*?)\]\]>/
        const title: string = el.find(" title ").text()!.replace(regex, '$1')
        const description = {html: el.find(" description ").html()!, text: el.find(" description ").text()!}
        description.html = description.html.replace(']]&gt;', '')
    
        const pubDate: Date = new Date(el.find(" pubDate ").text()!)
        const start: Date = new Date(el.find(" start ").text()!)
        const end: Date = new Date(el.find(" end ").text()!)

        event = { ...event, URL: URL, title: title, img: img, description: description, pubDate: pubDate, start: start, end: end }
       
        eventArr.push(event)
    });

    if (!await isUpToDate(eventArr)) {
        return eventArr;
    }
    else {return []}

}

export default getEvents3;