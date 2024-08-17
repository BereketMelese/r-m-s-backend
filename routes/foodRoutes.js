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
router.post("/", auth, rollCheck(["admin"]), createFood); //router.post("/", auth, rollCheck(["admin"]), createFood);
router.patch("/:id", updateFood); //router.patch("/:id", auth, rollCheck(["admin"]), updateFood);
router.delete("/:id", deleteFood); //router.delete("/:id", auth, rollCheck(["admin"]), deleteFood);

module.exports = router;
