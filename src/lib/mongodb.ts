import { MongoClient, ServerApiVersion } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const atlasURI = `mongodb+srv://tristan:${process.env.MONGODB_ATLAS_PW}@sachse-site.rc7rjk1.mongodb.net/?retryWrites=true&w=majority`
const localURI = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client = new MongoClient(atlasURI, options);
let clientPromise: Promise<MongoClient>

// async function run() {
//   console.log('running connect fn')
//   try {
//     // clientPromise = await client.connect();
//     global._mongoClientPromise = await client.connect()
//     clientPromise = global._mongoClientPromise
//     // Send a ping to confirm a successful connection
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     console.log('CLIENTPROMISE: ', clientPromise);
//     const db = await (await clientPromise).db("sachse-site");
//     const data = await db.collection('alerts');
//     const collection = await data
//       .find()
//       .limit(2)
//       .sort({ createdAt: -1 })
//       .toArray()
//     console.log('EXAMPLE COLLECTION: ',collection)
//     // await client.close();
//   }
// }
// run().catch(console.dir);

const connect = async () => {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use global variable
    if (!global._mongoClientPromise) {
      // client = new MongoClient(atlasURI, options)
      global._mongoClientPromise = client.connect()
      clientPromise = global._mongoClientPromise
    }
  }
  else {
    clientPromise = client.connect()
  }
}

connect().catch(console.dir);

export default clientPromise!