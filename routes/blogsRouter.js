const express = require('express')
const blogsRouter = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')

// blogsRouter replaces app.get('/api/blogs')
blogsRouter.get('/', (req, res) => {
    Blog.find({}).populate('user', {user: 1})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', async(req, res) => {
    const body = req.body
    const user = await User.findById(body.userId)

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

module.exports = blogsRouter