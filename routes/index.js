const express = require('express');
const {
  createTopic,
  editTopic,
  getTopics
} = require("../controllers/topics")
const router = express.Router();
/* GET the default API route. */
router.get('/', (req, res, next) =>{
  res.json('index').status(200);
});
router.post('/topic',createTopic)
router.get('/topic',getTopics)
router.put('/topic/',editTopic)
module.exports = router;
