const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoURL = 'mongodb://127.0.0.1/bloglist'

async function main(){
    console.log('trying to connect to DB' )
    try{
        await mongoose.connect(mongoURL)
        console.log('connected to local DB...')
    }
    catch(err){
        console.log('error')
        console.log(err)
    }
}
main()

module.exports = Blog