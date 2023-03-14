const Quiz = require("../models/quiz")
const User = require("../models/user")

const createQuiz = async (req,res,next )=>{
const { questions,authorId,name,time, description } = req.body
const user = await User.findById(authorId)
if(user){
const quiz = await Quiz.create({
    questions,
    scores:[],
    name,
    authorId,
    time,
    description
})
  await quiz.save() 
  user.quizzes.push(quiz._id)
  user.save()
  res.status(200).json(quiz)

}else{
res.status(400).json({"error":"Author not found"})
}
}
const delQuiz =  async (req,res,next )=>{
    
  const quiz = req.quiz

  if (quiz) {
    await quiz.remove()
    res.json({ message: 'Quiz removed' })
  } else {
    res.status(404)
    throw new Error('Quiz not found')
  }
}
const updateQuiz = async (req,res,next )=>{

    const quiz = req.quiz;
    if (quiz) {
  for (const attr in quiz) {
      quiz.attr = req.body.attr ? req.body.attr : quiz.attr;
    
  }
      const updatedQuiz = await quiz.save()
  
      res.status(200).json(updatedQuiz)
    } else {
      res.status(404).json({"error":'Quiz not found'})
    }
}
const getQuizById = async (req,res,next )=>{
const quiz = await Quiz.findById(req.params.id)
if (quiz) {
res.status(200).json(quiz)
} else {
    res.status(404).json({"error":'Quiz not found'})
}
}
const getUserQuizes = async (req,res,next )=>{
  
    const { id } = req.params
    
  const user = await User.findById(id)
  if(user){
    console.log(user)
  const limit = req.query.limit || 10
  const startIndex = req.query.start ||  0 
  const endIndex =  limit
  const sortBy = req.query.sortBy || 'title'
  const sortOrder = req.query.sortOrder || 'asc'
  const filter = req.query.filter || ''

  const quizzes = []
  for(i=0;i<user.quizzes.length;i++){
    const quiz = await Quiz.findById(user.quizzes[i])
    quizzes.push(quiz)
  }
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(filter.toLowerCase())
  )
  const sortedQuizzes = filteredQuizzes.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })
  const results = sortedQuizzes.slice(startIndex, endIndex)

  res.status(200).json({
    limit,
    total: filteredQuizzes.length,
    results
  })

}
  else {
    res.status(404).json({"error":'User not found'})
  }
}

module.exports = {
     createQuiz,
     delQuiz,
     updateQuiz,
     getQuizById,
     getUserQuizes
}