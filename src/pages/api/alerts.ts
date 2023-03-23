import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'
import getNewAlerts from './(scrapers)/getAlerts'

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    switch (req.method) {
        case "POST":
          break;
        case "GET":
          getNewAlerts()

          const alertRes = await alerts
            .find()
            .sort({ createdAt: -1 })
            .toArray()

          res.json(alertRes);
          break;
      }

}

export default Alerts