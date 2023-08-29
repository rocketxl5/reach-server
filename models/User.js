const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        requred: true
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
        required: true,
        dafault: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)