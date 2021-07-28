const express = require('express')
const Asset = require('../models/asset')
const router = new express.Router()


router.post('/assets', async (req, res) => {
    const asset = new Asset(req.body)

    try {
        await asset.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/assets', async (req, res) => {
    try {
        const assets = await Asset.find({})
        res.send(assets)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/assets/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const asset = await Asset.findById(_id)

        if (!asset) {
            return res.status(404).send()
        }

        res.send(asset)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/assets/:id', async (req, res) => {
    const updates = Object.keys(req,body)
    const allowedUpdates = ['name', 'assetType', 'serialNumber', 'model', 'status', 'assetId', 'description', 'condition']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!asset) {
            return res.status(404).send()
        }

        res.send(asset)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/assets/:id', async (req, res) => {
    try {
        const asset = await User.findByIdAndDelete(req.params.id)

        if(!asset) {
            return res.status(404).send()
        }

        res.send(asset)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router