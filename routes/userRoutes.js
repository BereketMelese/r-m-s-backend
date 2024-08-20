const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { getFoods } = require("../controllers/foodController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/food", getFoods);

module.exports = router;
