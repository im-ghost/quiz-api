const express = require('express');
const router = express.Router();
const {
    createQuiz,
    delQuiz,
    updateQuiz,
    getQuizById,
    getUserQuizes
} = require("../controllers/quiz");
const {
  protect,
  protectMe,
  protectQuiz
 } = require('../middlewares/auth.middleware');


router.post("/",protect,createQuiz)
router.put("/quiz/:id",protect,protectQuiz,updateQuiz)
router.delete("/quiz/:id",protect,protectQuiz,delQuiz)
router.get("/quiz/:id",getQuizById)
router.get("/user/:id",protect,getUserQuizes)
module.exports = router;
