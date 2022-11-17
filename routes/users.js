const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/user");
const {
  protect,
  protectMe
 } = require('../middlewares/auth.middleware');

router.get("/",protect,getUsers)
router.post("/",(req,res,next)=>{
  console.log("here")
  next()
},registerUser)
router.post("/user/login",authUser)  
router.get("/:id",protect,getUserById)
router.put("/user/:id",protect,protectMe,updateUser)
router.delete("/user/:id",protect,protectMe ,deleteUser)
router.get("/user/:id",protect,getUserById)
module.exports = router;
