import { NextResponse } from 'next/server';
import getEvents from '../../(scrapers)/events/getEvents';

export const dynamic = 'force-dynamic';
// export const revalidate = 0;

export async function GET(request: Request) {
  
    /* Scraper */
    const events = await getEvents();
    
    let response: NextResponse;
    if (!events) {response = NextResponse.json({noupdate: 'all documents are up to date'});}
    else if (events) {response = NextResponse.json({updatedEvents: 'events scraped and updated', events: events});}
    else {response = NextResponse.json({error: 'scraper error'});}
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Connection', 'keep-alive');
    // response.headers.set('Keep-Alive', 'timeout=5');
    // response.headers.set('Transfer-Encoding', 'chunked');

    return response;

  }