const express = require("express");
const mongoose = require("mongoose");
//const Router = require("./routes")

const app = express();

app.use(express.json());

//const url = 'mongodb+srv://nj78:comp576Admin@cluster0.i7rih.mongodb.net/compx576?retryWrites=true&w=majority';

// mongodb+srv://nj78:<password>@cluster0.i7rih.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const username = "nj78";
const password = "compx576Admin";
const cluster = "cluster0.i7rih";
const dbname = "compx576";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

