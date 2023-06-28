import * as cheerio from 'cheerio';

const WordCount = (body: string): number => {
    let wordCount: number = 0;
    const $ = cheerio.load(body)
    // console.log('body inside reading time fn: ', body)
    // console.log('body inside cheerio fn', $('*').html());
    // $('*').each(async (i, e) => {
    //     // wordCount += $(e).text().split(' ').length;
    //     console.log($(e).text().split(' '));
    //     console.log(`line number ${i}: `, $(e).text().split(' ').length);
    // })
    wordCount = $('body').text().split(' ').length;
    console.log(wordCount);
    return wordCount;
}

const readingTime = (body: string) => {
    const wpm = 225;
    const wordCount: number = WordCount(body);
    return Math.ceil(wordCount / wpm);
}

export default readingTime;