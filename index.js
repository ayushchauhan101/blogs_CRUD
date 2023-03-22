const http = require('http')
const express = require('express')
const cors = require('cors')

const Blog = require('./mongoConnect')

const app = express()

app.use(cors())
app.use(express.json())

// all the routes with the following url sent to separate location
app.use('/api/blogs', require('./routes/allRoutes'))


const PORT = 8000
app.listen(PORT, () =>`Server running on port ${PORT}`)
