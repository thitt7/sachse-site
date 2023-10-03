import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import getNews from '../(scrapers)/getNews';

export async function GET(request: Request) {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('news');
  
    const { searchParams } = new URL(request.url)
    const {slug, limit, offset} = Object.fromEntries(searchParams.entries())
  
    /* Scraper */
    // getNews()
  
    if (slug) {
        const Article = await alerts.find( {slug: slug} ).toArray()
        return NextResponse.json(Article);
    }
    else {
        const News = await alerts
        .find( )
        // .find( { createdAt: { $lt: new Date('2021-03-01') } } )
        .sort({ createdAt: -1 })
        .skip(Number(offset))
        .limit(Number(limit))
        .toArray()
  
      return NextResponse.json(News);
    }
    
  }