const mongoose = require('mongoose')
require('dotenv').config('../.env')

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.ATLAS_URI)
  
      console.log('Successfully connected to database')
    } catch (err) {
      console.error(err.message)
      
      // Exit process with failure
      process.exit(1)
    }
  };

module.exports = connectDB