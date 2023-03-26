const express = require('express')
const userRouter = express.Router()

const User = require('../models/userModel')

userRouter.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    })
})

userRouter.post('/', (req, res) => {
    let new_user = new User(req.body)

    new_user.save().then(result => {
        res.status(201).json(result)
    })
})

userRouter.get('/:id', (req, res) => {
    User.findById(req.params.id)
    .then(result => {        
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
    })
})

userRouter.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(result => {
            res.status(200).end()
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = userRouter