const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const {body, validationResult} = require('express-validator')
// const authentication = require('../middleware/authentication')



// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        
        res.status(201).json({ data: users })
    } catch {
        res.status(500).json({message: err.message})
    }
})

router.post('/login', async (req, res) => {

    const { email } = await req.body

    try {
        let user = await User.findOne({ email })

        if (!user) {
            console.log('no user found')
            return
        }
        // console.log(user)
        // const isMatch = await bcrypt.compare(password, user.password)

        // if (!isMatch) {
        //     console.log('Wrong password')
        //     return res.status(400).json({ errors: [{ message: 'Wrong password' }] })
        // }

        res.status(201).json({ data: user })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/register', async (req, res) => {
    const { name, email, password } = await req.body

    try {

        res.status(201).json({ data: user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;