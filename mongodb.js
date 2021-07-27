// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const username = "nj78";
const password = "compx576Admin";
const cluster = "cluster0.i7rih";
const dbname = "compx576";


//const connectionURL = 'mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority'
const connectionURL = 'mongodb+srv://nj78:compx576Admin@cluster0.i7rih.mongodb.net/'
const databaseName = 'comp576'

MongoClient.connect(connectionURL, { 
    useNewUrlParser: true //, 
    //useUnifiedTopology: false
  }, (error, client) => {
    if (error) {
      return console.log('Unable to connect to database!')
  }

    const db = client.db(databaseName)

    db.collection('users').insertOne({
      name: 'Nick',
      age: 40
    })
})