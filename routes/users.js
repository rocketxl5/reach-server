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
        
        res.json(users);
    } catch {
        res.status(500).json({message: err.message})
    }
})

module.exports = router;