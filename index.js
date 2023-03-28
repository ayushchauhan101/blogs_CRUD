const express = require('express')
const cors = require('cors')

const app = express()

require('./mongoConnect')

app.use(cors())
app.use(express.json())

// all the routes with the following url sent to separate location
app.use('/api/blogs', require('./routes/blogsRouter'))
app.use('/api/users', require('./routes/userRouter'))


const PORT = 8000
app.listen(PORT, () =>`Server running on port ${PORT}`)
