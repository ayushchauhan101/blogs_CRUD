const bcrypt = require('bcrypt')
const express = require('express')
const userRouter = express.Router()

const User = require('../models/userModel')

userRouter.get('/', (req, res) => {
    User.find({}).populate('blogs', {title: 1, url: 1, likes: 1})
    .then(users => {
        res.json(users)
    })
})

userRouter.post('/', async (req, res) => {

    const {user, password} = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const new_user = new User({
        user, 
        passwordHash
    })

    try{
        const savedUser = await new_user.save()
        res.status(200).json(savedUser)
    }catch(err){
        if(err.name === 'MongoError' || err.code === 11000){
            res.status(400).json({error: 'this user already exist!'})
        }else{
            res.status(400).end()
        }
    }

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