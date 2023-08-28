const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    others:{
      type: Object,
      required: true,
    }
  })

const Topic = mongoose.model('Topic', userSchema)

module.exports= Topic
