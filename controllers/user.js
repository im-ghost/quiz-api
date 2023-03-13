const {
  generateToken
} = require("../middlewares/auth.middleware")
const bcrypt = require("bcryptjs")
const User = require('../models/user.js');
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body
console.log(req.body)
  const user = await User.findOne({ email })
  if (user){
     if(await user.matchPassword(password)) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      quizzes: user.quizzes,
      quizTaken: user.quizTaken,
      token: generateToken(user._id),
    })
  }
  else{
    res.status(401).json({"error":"wrong passwod"})
  }
} else {
    res.status(401).json({"error":"invalid email"})
  }
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  
  const { name, email, password } = req.body
console.log(req.body)
  const userExists = await User.findOne({ email })
var pass= password;
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,salt)
pass = hash 
  if (userExists) {
    res.status(400).json({"error":'User already exists'})
  }

  const user = await User.create({
    name:name,
    email:email,
    password: pass,
    quizzes:[],
    quizTaken:[]
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      quizzes: user.quizzes,
      quizTaken: user.quizTaken,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({"error":'Invalid user data'})
  }
}
// @desc    Get all users
// @route   GET /api/user
const getUsers = async (req, res) => {
  const users = await User.find({})
  res.json(users)
}

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
for (const attr in user) {
  if(attr === "password"){
var pass= req.body.password;
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(req.body.password,salt)
console.log(hash)
pass = hash 
console.log(hash)
user.password = pass;
  }
    user.attr = req.body.attr ? req.body.attr : user.attr
    
}
    const updatedUser = await user.save()

    res.json(updatedUser)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}


async function getUserQuizAttempts(req, res) {
  const { id } = req.params
  const { quizTaken } = await User.findById(id)

  res.status(200).json(quizTaken)
}
module.exports = {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserQuizAttempts
}