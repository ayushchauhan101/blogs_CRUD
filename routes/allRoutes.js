const express = require('express')
const router = express.Router()

const Blog = require('../mongoConnect')

// router replaces app

router.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
})

router.post('/', (req, res) => {
    let new_blog = new Blog(req.body)
    
    new_blog.save()
        .then(result => {
            res.status(201).json(result)
            // res.redirect(303, '/api/blogs')
        })
})

module.exports = router