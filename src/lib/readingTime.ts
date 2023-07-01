import * as cheerio from 'cheerio';

const WordCount = (body: string): number => {
    let wordCount: number = 0;
    const $ = cheerio.load(body)

    wordCount = $('body').text().split(' ').length;
    return wordCount;
}

const readingTime = (body: string) => {
    const wpm = 225;
    const wordCount: number = WordCount(body);
    return Math.ceil(wordCount / wpm);
}

export default readingTime;