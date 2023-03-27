const mongoose = require('mongoose')

// require('../mongoConnect')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    // refer to blogSchema and Blog collection 
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
        }
    ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User