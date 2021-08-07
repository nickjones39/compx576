const mongoose = require('mongoose')

//mongoose.connect('mongodb+srv://nj78:compx576Admin@cluster0.i7rih.mongodb.net/compx576', {
mongoose.connect('mongodb://localhost:27017/576', {   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


