const { MongoClient } = require('mongodb');
// Connection URI
//mongodb+srv://nj78:Ultima%23Rocks7@cluster0.i7rih.mongodb.net/test?authSource=admin&replicaSet=atlas-txdio7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
const uri =
  'mongodb+srv://nj78:comp576Admin@cluster0.i7rih.mongodb.net/compx576?retryWrites=true&w=majority';
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to server');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
