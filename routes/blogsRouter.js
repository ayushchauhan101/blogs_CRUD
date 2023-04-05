const express = require('express')
const blogsRouter = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')

require('dotenv').config()
const jwt = require('jsonwebtoken')

// function to parse token from authorization header
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

// blogsRouter replaces app.get('/api/blogs')
blogsRouter.get('/', (req, res) => {
    Blog.find({}).populate('user', {user: 1})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', async(req, res) => {
    const body = req.body

    // contains sent data if verified or returns error
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    
    // missing token or invalid token error handler
    if (!decodedToken.id){
        res.status(401).json({error: 'token invalid'})
    }

    //error handler for expired or timed out token 
    // else if(decodedToken.name === 'TokenExpiredError'){
    //     res.status(401).json({error: 'token expired'})
    // }

    // search for user document once authorized and token verified
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,

        // this will contain the id of the user
        user: user.id

        // a new note id will be generated as well  
    })

    const savedBlog = await blog.save()

    // concat newly created blog to current blogs array
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(200).json(savedBlog)
})

blogsRouter.get('/:id', (req, res) => {
    Blog.findById(req.params.id).then(result => {
        res.status(200).json(result)
    })
})

blogsRouter.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
    .then(result =>{
        res.status(200).end()
    })
    .catch(err => {
        console.log(err)
    })
})

blogsRouter.put('/:id', (req, res) => {
    const body = req.body

    // can update anything other than user id
    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes
    })

    Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => {
            res.json({error})
        })
})

module.exports = blogsRouter