// CRUD operations

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'comp576'

MongoClient.connect(connectionURL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: false
})