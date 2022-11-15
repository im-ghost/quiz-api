const Quiz = require("../models/quiz")
const User = require("../models/user")

const createQuiz = async (req,res,next )=>{
const { questions,answers,authorId,name,time } = req.body

const quiz = await Quiz.create({
    questions,
    answers,
    name,
    authorId,
    time
})
  await quiz.save() 
  res.status(200).json(quiz)

}
const delQuiz =  async (req,res,next )=>{
    
  const quiz = await Quiz.findById(req.params.id)

  if (quiz) {
    await quiz.remove()
    res.json({ message: 'Quiz removed' })
  } else {
    res.status(404)
    throw new Error('Quiz not found')
  }
}
const updateQuiz = async (req,res,next )=>{

    const quiz = await Quiz.findById(req.params.id)

    if (quiz) {
  for (const attr of quiz) {
      quiz.attr = req.body.attr ? req.body.attr : quiz.attr
      
  }
      const updatedQuiz = await quiz.save()
  
      res.json(updatedQuiz)
    } else {
      res.status(404)
      throw new Error('Quiz not found')
    }
}
const getQuizById = async (req,res,next )=>{
const quiz = await Quiz.findById(req.params.id)
if (quiz) {
res.status(200).json(quiz)
} else {
    res.status(404)
    throw new Error('Quiz not found')
}
}
const getUserQuizes = async (req,res,next )=>{
    const { id } = req.params
    
  const user = await User.findById(id)

  if (user) {
    res.json(user.quizes)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}

module.exports = {
     createQuiz,
     delQuiz,
     updateQuiz,
     getQuizById,
     getUserQuizes
}