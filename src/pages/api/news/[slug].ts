import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const news = await db.collection('news');

    const {slug} = req.query

    const response = await news.find( {"slug": slug} ).toArray();

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          res.json(response);
          break;
      }

}

export default Alerts