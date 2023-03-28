const express = require('express')
const blogsRouter = express.Router()

const Blog = require('../models/blogModel')
const User = require('../models/userModel')

// blogsRouter replaces app.get('/api/blogs')
blogsRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.post('/', async(req, res) => {
    const body = req.body
    console.log(body)
    // const user = await User.findById(body.userId)

    const new_blog = new Blog ({
        title: body.title,
        user: body.user,
        url: body.url,
        likes: body.likes
    })

    const newBlog = await new_blog.save()

    // user.blogs = user.blogs.concat(newBlog._id)
    // await user.save()

    res.status(200).json(newBlog)
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