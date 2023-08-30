const express = require('express')
const compression = require('compression')
const connectDB = require('./config/db.js')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN)
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    req.header("Access-Control-Allow-Methods", "*")
    next()
})

app.use(compression())

// console.log(process.env)

app.use(express.json())

const usersRouter = require('./routes/users.js')

app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))