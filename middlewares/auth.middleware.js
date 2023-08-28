const jwt = require('jsonwebtoken')
const User = require('../models/user.js')
const Quiz = require('../models/quiz.js')
require("dotenv").config()
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '30d',
  })
}
const protect = async (req, res, next) => {
  let token
console.log(req.headers)
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
      res.status(401).json({"error":"not authorized"})
    }
  }

  if (!token) {
    console.log("no token")
    res.status(401).json({"error":"no token"})
  }
}
const protectMe =(req,res,next) =>{
  console.log(req.user._id.toHexString())
    if(req.user._id.toHexString() === req.params.id){
      console.log("correct user ")
        next()
    }else{
         console.log("here")
      console.log(error)
      res.status(401).json({"error":'Not authorized'})
    }
}
const protectQuiz =async (req,res,next) =>{
  const quiz = await Quiz.findById(req.params.id)
  console.log(quiz)
    if(req.user._id.toHexString() === quiz.authorId){
      console.log("correct user ")
      req.quiz = quiz
        next()
    }else{
         console.log("here")
      res.status(401).json({"error":'Not authorized'})
    }
}
module.exports = {
    generateToken,
    protect,
    protectMe,
    protectQuiz
}
