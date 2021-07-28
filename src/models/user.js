const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
})

// const user = new User({
//     name: 'Nick',
//     sex: 0,
//     address: '8 Rochdale Close',
//     phone: '+64284007761',
//     email: 'nj78@students.waikato.ac.nz',
//     password: 'password',
//     userID: '1'
// })

// user.save().then(() => {
//     console.log(user)
// }).catch((error) => {
//     console.log('Error', error)
// })

module.exports = User