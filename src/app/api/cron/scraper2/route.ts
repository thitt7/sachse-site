import { NextResponse } from 'next/server';
import getNewAlerts from '../../(scrapers)/getAlerts';
import getNews from '../../(scrapers)/getNews';

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export async function GET(request: Request) {
  
    /* Scraper */
    // const alerts = await getNewAlerts();
    console.log('starting req')
    const news = await getNews()
    console.log('req complete')

    let response: NextResponse;
    
    // if (!news && !alerts) {response = NextResponse.json({noupdate: 'all documents are up to date'});}
    // else if (news || alerts) {response = NextResponse.json({updated: 'alerts and/or news scraped and updated', news: news, alerts: alerts});}
    // else {response = NextResponse.json({error: 'scraper error'});}

    if (!news) {response = NextResponse.json({noupdate: 'all documents are up to date'});}
    else if (news) {response = NextResponse.json({updated: 'news scraped and updated', news: news});}
    else {response = NextResponse.json({error: 'scraper error'});}
    
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Connection', 'keep-alive');
    // response.headers.set('Keep-Alive', 'timeout=5');
    // response.headers.set('Transfer-Encoding', 'chunked');

    return response;

  }