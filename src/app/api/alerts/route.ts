import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';
import getNewAlerts from '../(scrapers)/getAlerts';

export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("sachse-site");
  const alerts = await db.collection('alerts');

  const { searchParams } = new URL(request.url)
  const {id, page, limit, offset} = Object.fromEntries(searchParams.entries())

  /* Scraper */
  getNewAlerts()

  if (id) {
    const objectid = new ObjectId(id as string)
    const Alert = await alerts.find( {_id : objectid} ).toArray()
    return NextResponse.json(Alert);
  }
  else {
    const alertRes = await alerts
    .find( )
    // .find( { createdAt: { $lt: new Date('2021-03-01') } } )
    .sort({ createdAt: -1 })
    .skip(Number(offset))
    .limit(Number(limit))
    .toArray()

    return NextResponse.json(alertRes);
  }
}