const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb+srv://nj78:compx576Admin@cluster0.i7rih.mongodb.net/compx576', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
})

const Asset = mongoose.model('Asset', {
    name: {
        type: String,
        required: true
    },
    assetType: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    assetID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    condition: {
        type: Number,
        required: true
    }
})

// const asset = new Asset({
//     name: 'iPhone',
//     assetType: 'Mobile Phone',
//     serialNumber: 'C36QR1YVGRX5',
//     model: 'iPhone 6s Plus',
//     status: 1,
//     assetID: 'A1',
//     description: 'Company phone, a few scratches on it',
//     condition: 2,
// })

// asset.save().then(() => {
//     console.log(asset)
// }).catch((error) => {
//     console.log(error)
// })

const user = new User({
    name: 'Nick',
    sex: 0,
    address: '8 Rochdale Close',
    phone: '+64284007761',
    email: 'nj78@students.waikato.ac.nz',
    password: 'password',
    userID: '1'
})

user.save().then(() => {
    console.log(user)
}).catch((error) => {
    console.log('Error', error)
})
