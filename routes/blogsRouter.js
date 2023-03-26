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

// blogsRouter.post('/', (req, res) => {
//     let new_blog = new Blog(req.body)
    
//     new_blog.save()
//         .then(result => {
//             // res.status(201).json(result)
//             res.redirect(303, '/api/blogs')
//         })
// })

blogsRouter.post('/', async(req, res) => {
    const body = req.body

    const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        user: user.id,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.json(savedBlog)
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