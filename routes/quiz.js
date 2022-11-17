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
  protectMe
 } = require('../middlewares/auth.middleware');

router.get("/:id",protect,getUserQuizes)
router.post("/",createQuiz)
router.put("/quiz/:id",protect,protectMe,updateQuiz)
router.delete("/quiz/:id",protect,protectMe ,delQuiz)
router.get("/quiz/:id",protect,getQuizById)
module.exports = router;
