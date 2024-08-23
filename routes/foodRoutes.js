const express = require("express");
const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");
const { auth, rollCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getFoods);
router.post("/add", auth, rollCheck(["admin"]), createFood);
router.patch("/:id", auth, rollCheck(["admin"]), updateFood);
router.delete("/:id", auth, rollCheck(["admin"]), deleteFood);

module.exports = router;
