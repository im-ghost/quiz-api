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
    time: {
      type: Date,
      required: true
    },
    questions:{
      type:Array,
      default:[]
    
    },
    answers:{
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
