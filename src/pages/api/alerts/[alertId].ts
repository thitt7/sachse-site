import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");
    const alerts = await db.collection('alerts');

    const {alertId} = req.query

    switch (req.method) {
        case "POST":
          break;
        case "GET":

        //   const alertRes = await alerts
        //     .find({_id: alertId})
        //     .sort({ createdAt: -1 })
        //     // .limit(Number(limit))
        //     .limit(10)
        //     .toArray()

        //   res.json(alertRes);
        res.json({ID: alertId})
          break;
      }

}

export default handler