const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");

const { auth } = require("../middleware/authMiddleware");
const { getFoods } = require("../controllers/foodController");

const router = express.Router();

router.get("/:id", auth, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/food", getFoods);

module.exports = router;
