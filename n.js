// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(express.json());

const uri = "mongodb+srv://nj78:comp576Admin@cluster0.i7rih.mongodb.net/compx576?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});