const path = require('path')
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Asset = require('./models/asset')
const userRouter = require('./routers/user')
const assetRouter = require('./routers/asset')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
// app.use((req, res, next) => {
//     res.status(503).send('Site currently down. Check back soon!')
// })

app.get('', (req, res) => {
    res.render('index')
})

app.use(express.json())
app.use(userRouter)
app.use(assetRouter)

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log('Server is up on: ' + port)
})

// const main = async () => {
//     const user = await User.findById('xxx')
//     await user.populate('assets').execPopulate()
//     console.log(user.assets)
// }

// main()