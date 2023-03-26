const express = require('express')
const userRouter = express.Router()

const User = require('../models/userModel')

userRouter.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    })
})

userRouter.post('/', (req, res) => {
    let new_user = req.body

    new_user.save().then(result => {
        res.status(201).json(result)
    })
})

module.exports = userRouter