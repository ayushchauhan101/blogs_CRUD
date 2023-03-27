const bcrypt = require('bcrypt')
const express = require('express')
const userRouter = express.Router()

const User = require('../models/userModel')

userRouter.get('/', (req, res) => {
    User.find().then(users => {
        res.json(users)
    })
})

userRouter.post('/', async (req, res) => {

    // take three data from users
    const {user, password} = req.body

    // store the password hash instead of the password 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const new_user = new User({
        user,
        passwordHash
    })

    const savedUser = await new_user.save()

    res.status(200).json(savedUser)
    // res.status(200).redirect('/api/users')
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