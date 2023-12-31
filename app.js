const express = require('express')
const cors = require('cors')
const compression = require('compression')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001
connectDB()

// Middlewares
app.use(cors({ origin: '*', credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(compression())

const usersRouter = require('./routes/users.js')

app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))