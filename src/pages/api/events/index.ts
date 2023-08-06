import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import getEvents from '../(scrapers)/events/getEvents';
import { ObjectId } from 'mongodb';

const News = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const events = await db.collection('events');

    const {id} = req.query

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
            .find( )
            .toArray()

          res.json(Events);
          }

          break;
      }

}

export default News