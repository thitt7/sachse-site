import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import getEvents from '../(scrapers)/events/getEvents';

export async function GET(request: Request) {
  const client = await clientPromise;
  const db = client.db("sachse-site");
  const events = await db.collection('events');

  const { searchParams } = new URL(request.url)
  const {id, now, limit, offset} = Object.fromEntries(searchParams.entries())

  /* Scraper */
  // await getEvents()

  if (id) {
    const objectid = new ObjectId(id as string)
    const Event = await events.find( {_id : objectid} ).toArray()
    return NextResponse.json(Event);
  }
  else {
    const Events = await events
      .find({
        start: {
            $gte: now ? new Date(Date.now()) : '',
            // $lte: new Date("2023-08-30")
        }})
      .sort({ start: 1 })
      .skip(Number(offset))
      .limit(Number(limit))
      .toArray()

      return NextResponse.json(Events);
  }
}