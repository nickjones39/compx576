const jwt = require('jsonwebtoken')
const user = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorisation').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'SEED4compx576')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth