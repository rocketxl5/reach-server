const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')
const compression = require('compression')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001
connectDB()

// Middlewares
app.use(cors({ origin: '*', credentials: true }))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    req.header("Access-Control-Allow-Methods", "*")
    next()
})

// app.use(compression())

const usersRouter = require('./routes/users.js')

app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))