const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  submitRating,
} = require("../controllers/userController");

const { auth } = require("../middleware/authMiddleware");
const { getFoods } = require("../controllers/foodController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/rate", submitRating);
router.get("/:id", auth, getUsers);
router.get("/food", getFoods);

module.exports = router;
