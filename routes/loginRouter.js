require('dotenv').config()
const jwt = require('jsonwebtoken')

const loginRouter = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res) => {

    // received data from user
    const {username, password} = req.body

    // search user by username and store to user variable
    const user = await User.findOne({user : username})

    // store response of password comparision
    // bcrypt compare between user sent password and passwordHash stored in the database
    const passwordCorrect = (user === null) ? false : await bcrypt.compare(password, user.passwordHash)

    // if no user is found or password compare returns false
    if (! (user && passwordCorrect)){
        res.status(401).json({
            error: 'invalid username or password'
        })
    }

    // create a new variable and storing user and _id field from the database
    const userForToken = {
        username: user.user,
        id: user._id
    }

    // create a new token using new variable and a secret hidden key
    const token = jwt.sign(userForToken, process.env.SECRET)

    // responding with the generated token and username i.e. user value from user instance
    res.status(200).json({token, username: user.user})
})

loginRouter.get('/', (req, res) => {
    res.json({message : 'this is the Login page!'})
})

module.exports = loginRouter