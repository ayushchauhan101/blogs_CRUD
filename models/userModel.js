const mongoose = require('mongoose')

require('../mongoConnect')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
        }
    ],
})


const User = mongoose.model('User', userSchema)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})


module.exports = User