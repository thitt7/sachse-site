import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import getEvents from '../(scrapers)/getEvents';

const News = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const events = await db.collection('events');

    const {page, limit, offset} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          getEvents()

        //   const newsRes = await events
        //     .find( )
        //     // .find( { createdAt: { $lt: new Date('2021-03-01') } } )
        //     .sort({ createdAt: -1 })
        //     .skip(Number(offset))
        //     .limit(Number(limit))
        //     .toArray()

        //   res.json(newsRes);
          break;
      }

}

export default News