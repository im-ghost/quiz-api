const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/user")

router.get("/",getUsers)
router.post("/",registerUser)#
router.get("/user/login",authUser)
router.get("/:id",getUserById)
router.put("/user/:id",updateUser)
router.delete("/user/:id",deleteUser)
router.get("/user/:id",getUserById)
module.exports = router;
