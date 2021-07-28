const mongoose = require('mongoose')
const validator = require('validator')

const Asset = mongoose.model('Asset', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    assetType: {
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
    assetId: {
        type: String,
        required: true,
        trim: true
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