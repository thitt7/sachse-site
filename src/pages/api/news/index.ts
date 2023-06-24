import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import getNews from '../(scrapers)/getNews';

const News = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('news');

    const {page, limit, offset} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          getNews()

          const newsRes = await alerts
            .find( )
            // .find( { createdAt: { $lt: new Date('2021-03-01') } } )
            .sort({ createdAt: -1 })
            .skip(Number(offset))
            .limit(Number(limit))
            .toArray()

          res.json(newsRes);
          break;
      }

}

export default News