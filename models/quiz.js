const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const quizSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    time: {
      type: Date
    },
    questions:{
      type:Array,
      default:[]
    
    },
    score:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps: true,
  }
)


const Quiz = mongoose.model('Quiz', quizSchema)

module.exports=Quiz
