const Topic = require("../models/Topic");

const getTopics = async (req,res,next) =>{
  const topics = await Topic.find()
  res.status(200).json({topics:topics})
}

const createTopic = async (req,res) =>{
  const topic = await Topic.create(req.body);
  if(topic){
    res.status(200).json({topic:topic})
  }else{
    res.status(400).json({error:'r'})
  }
}

const editTopic = async (req,res)=>{
  const topic = await Topic.findById(req.body.id);
  if(topic){
    const newTopic = {...topic,others:req.body.others}
    res.status(200).json({topic:newTopic})
  }
}


module.exports ={
  editTopic,
  createTopic,
  getTopics
}
