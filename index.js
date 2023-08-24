const express = require('express')
const connectDB = require('./config/db.js')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

// Middlewares
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.use(express.json())

const usersRouter = require('./routes/users.js')

app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))