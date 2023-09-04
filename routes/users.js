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
    body('password').isLength({ min: 3 }).withMessage('Password must have eight characters')
    ,
    async (req, res) => {

        const errors = validationResult(req);   

        if (!errors.isEmpty()) {
            errors.array()
            // return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = await req.body;
        const messages = {
            error: {
                input: 'Please provide a valid email address and password.',
                server: 'Something went wrong server side'
            }
        }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            console.log('Wrong email')
            return res.status(400).json(messages.error.input)
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                console.log('Wrong password')
                return res.status(400).json(messages.error.input)
            }
        } catch (error) {
            throw new Error(error)
        }

        const rest = (user) => {
            const { username, email, messages } = user
            return { username, email, messages }
        }

        res.status(201).json(rest(user))

    } catch (error) {
        throw new Error(error)
    }
})

router.post('/signup', async (req, res) => {

    const messages = {
            success: `Congratulations!`,
            error: {
                username: 'Username is already taken',
                email: 'Email is already taken',
            }
        }

    const { username, email, password } = await req.body

    try {
        // Check if name is available
        const userName = await User.findOne({ username })

        // Throw error if name exist
        if (userName) {
            throw new Error(messages.error.username)
        }

        // Check if email is available
        const userEmail = await User.findOne({ email })

        // Throw error if email exist
        if (userEmail) {
            throw new Error(messages.error.email)
        }

        if (password) {
            const newUser = new User({
                username,
                email,
                password,
                joined: Date.now()
            })
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);


            await newUser.save()

            res.status(200).json({ message: 'success' })
        } else {
            throw new Error('Password do not match')
        }




    } catch (error) {
        res.status(500).json(error.message);
    }
})


module.exports = router;