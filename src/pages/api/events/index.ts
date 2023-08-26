import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import getEvents from '../(scrapers)/events/getEvents';
import { ObjectId } from 'mongodb';

const Events = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const events = await db.collection('events');

    const {id, date, limit, offset} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          // await getEvents()

          if (id) {
            const objectid = new ObjectId(id as string)
            const Event = await events.find( {_id : objectid} ).toArray()
            res.json(Event);
          }
          else {
            const Events = await events
            .find({
              start: {
                  $gte: new Date(date as string),
                  // $lte: new Date("2023-08-30")
              }})
            .sort({ start: 1 })
            .skip(Number(offset))
            .limit(Number(limit))
            .toArray()

          res.json(Events);
          }

          break;
      }

}

export default Events