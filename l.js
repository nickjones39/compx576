const mongoose = require("mongoose")

const mongoString = "mongodb+srv://nj78:comp576Admin@cluster0.i7rih.mongodb.net/compx576?retryWrites=true&w=majority"

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//mongoose.connection.on("error", function(error) {
//  console.log(error)
//})

//mongoose.connection.on("open", function() {
//  console.log("Connected to MongoDB database.")
//})