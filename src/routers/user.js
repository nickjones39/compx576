const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


router.get('/all-users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})


// router.post('/users', async (req, res) => {
//     const user = new User(req.body)

//     try {
//         await user.save()
//         const token = await user.generateAuthToken()
//         res.status(201).send({ user, token })
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        //res.send({ user: user, token })
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', async (req, res) => {  //auth
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', async (req, res) => { // auth
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/users/me', async (req, res) => { // auth
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req,body)
//     const allowedUpdates = ['name', 'sex', 'address', 'phone', 'email', 'password', 'userId']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if(!isValidOperation) {
//         return res.status(400).send({error: 'Invalid updates!'})
//     }

//     try {
//         const user = await User.findById(req.params.id)

//         updates.forEach((update) => user[update] = req.body[update])
//         await user.save()
        
//         if(!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.patch('/users/update', async (req, res) => { // auth
    const updates = Object.keys(req,body)
    const allowedUpdates = ['name', 'address', 'phone', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if(!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.delete('/users/delete', async (req, res) => { //auth
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router