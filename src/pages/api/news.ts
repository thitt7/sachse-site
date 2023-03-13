import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db("sachse-city-site");
    switch (req.method) {
      case "POST":
        let bodyObject = JSON.parse(req.body);
        let myPost = await db.collection("posts").insertOne(bodyObject);
        console.log(myPost)
        // res.json(myPost.ops[0]);
        break;
      case "GET":
        const allPosts = await db.collection("examples").find({}).toArray();
        res.json({ status: 200, data: allPosts });
        break;
    }

  }