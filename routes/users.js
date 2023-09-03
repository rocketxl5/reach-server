const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        
        res.status(201).json({ data: users })
    } catch {
        res.status(500).json({message: err.message})
    }
})



router.post('/login',
    body('email').not().isEmpty(),
    body('password').isLength({ min: 3 }),
    async (req, res) => {

        const errors = validationResult(req);   

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = await req.body;
        const error = { message: 'Please provide a valid email address and password.' }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error(error.message)
        }

        // const isMatch = await bcrypt.compare(password, user.password)

        // if (!isMatch) {
        //     console.log('Wrong password')
        //     return res.status(400).json({ errors: [{ message: 'Wrong password' }] })
        // }

        const rest = (user) => {
            const { username, email, messages } = user
            return { username, email, messages }
        }

        res.status(201).json(rest(user))

    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/register',
    async (req, res) => {
        const { username, email, password } = await req.body

    try {

        res.status(201).json({ data: username })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;