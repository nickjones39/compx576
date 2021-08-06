const mongoose = require('mongoose')
const validator = require('validator')

const Asset = mongoose.model('Asset', {
    brand: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: String,
        required: true,
        trim: true
    },
    productType: {
        type: String,
        required: true,
        trim: true
    },
    serialNumber: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: Number,
        required: true,
        trim: true
    },
    lease: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
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

module.exports = Asset