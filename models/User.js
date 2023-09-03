const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        maxLength: 20,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        maxLength: 255,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    messages: {
        type: Object,
        default: {
            sent: [],
            received: []
        }
    },
    joined: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)