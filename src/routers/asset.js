const express = require('express')
const Asset = require('../models/asset')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/assets', auth, async (req, res) => {
    //const asset = new Asset(req.body)
    const asset = new Asset({
        ...req.body,
        lease: req.user._id
    })

    try {
        await asset.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/assets', auth, async (req, res) => {
    try {
        // !old! const assets = await Asset.find({})

        // option 1
        // const assets = await Task.find({ owner: req.user._id })

        await req.user.populate('assets').execPopulate()
        res.send(req.user.assets)

        //!old! res.send(assets)
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/assets/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const asset = await Asset.findById(_id)

//         if (!asset) {
//             return res.status(404).send()
//         }

//         res.send(asset)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.get('/assets/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        //const asset = await Asset.findById(_id)
        const task = await Task.findOne({ _id, lease: req.user._id })

        if (!asset) {
            return res.status(404).send()
        }

        res.send(asset)
    } catch (e) {
        res.status(500).send()
    }
})

// router.patch('/assets/:id', async (req, res) => {
//     const updates = Object.keys(req,body)
//     const allowedUpdates = ['name', 'assetType', 'serialNumber', 'model', 'status', 'assetId', 'description', 'condition']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if(!isValidOperation) {
//         return res.status(400).send({error: 'Invalid updates!'})
//     }

//     try {
//         const asset = await Asset.findById(req.params.id)

//         updates.forEach((update) => asset[update] = req.body[update])
//         await asset.save()

//         if(!asset) {
//             return res.status(404).send()
//         }

//         res.send(asset)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })


router.patch('/assets/:id', auth, async (req, res) => {
    const updates = Object.keys(req,body)
    const allowedUpdates = ['name', 'assetType', 'serialNumber', 'model', 'status', 'assetId', 'description', 'condition']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        
        const asset = await Asset.findOne({_id: req.params.id, lease: req.user._id})
        //const asset = await Asset.findById(req.params.id)

        // updates.forEach((update) => asset[update] = req.body[update])
        // await asset.save()        

        if(!asset) {
            return res.status(404).send()
        }

        updates.forEach((update) => asset[update] = req.body[update])
        await asset.save()

        res.send(asset)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.delete('/assets/:id', async (req, res) => {
//     try {
//         const asset = await User.findByIdAndDelete(req.params.id)

//         if(!asset) {
//             return res.status(404).send()
//         }

//         res.send(asset)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


router.delete('/assets/:id', auth, async (req, res) => {
    try {
        //const asset = await User.findByIdAndDelete(req.params.id)

        const asset = await Asset.findOneAndDelete({ _id: req.params.id, lease: req.user._id })

        if(!asset) {
            return res.status(404).send()
        }

        res.send(asset)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router