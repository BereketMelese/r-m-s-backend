const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { auth, rollCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.post("/add", auth, rollCheck(["admin"]), createCategory);
router.patch("/:id", auth, rollCheck(["admin"]), updateCategories);
router.delete("/:id", auth, rollCheck(["admin"]), deleteCategory);

module.exports = router;
