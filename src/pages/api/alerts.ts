import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'
import getNewAlerts from './(scrapers)/getAlerts'

const Alerts = async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await clientPromise;
    const db = client.db("sachse-site");

    switch (req.method) {
        case "POST":
        //   let bodyObject = JSON.parse(req.body);
        //   let myPost = await db.collection("posts").insertOne(bodyObject);
        //   console.log(myPost)
        //   // res.json(myPost.ops[0]);
          break;
        case "GET":
        //   const allPosts = await db.collection("examples").find({}).toArray();

            getNewAlerts()

            res.json({ status: 200, data: 'bitch' });
          break;
      }

}

export default Alerts