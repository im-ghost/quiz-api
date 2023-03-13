const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    token:{
      type:String
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quizzes:{
      type:Array,
      default:[]
    },
    quizTaken:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  const res = await bcrypt.compare(enteredPassword,this.password)

    if(res){
      console.log('cirre t')
      return true
    }else{
      console.log("error")
      return false
    }
  console.log("waited")
}
  

const User = mongoose.model('User', userSchema)

module.exports=User
