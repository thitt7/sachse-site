import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import getNewAlerts from '../(scrapers)/getAlerts';

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    const {page, limit, offset} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          getNewAlerts()

          const alertRes = await alerts
            .find( )
            // .find( { createdAt: { $lt: new Date('2021-03-01') } } )
            .sort({ createdAt: -1 })
            .skip(Number(offset))
            .limit(Number(limit))
            .toArray()

          res.json(alertRes);
          break;
      }

}

export default Alerts