const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
require("dotenv").config()
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '30d',
  })
}
const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization
  ) {
    try {
      // Get token from header
      token = req.headers.authorization

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
}
const protectMe =(req,res,next) =>{
    if(req.user._id === req.params.id){
        next()
    }else{
        
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
}
module.exports = {
    generateToken,
    protect,
    protectMe
}
