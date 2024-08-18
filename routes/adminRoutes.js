const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getDailySales,
  getMonthlySales,
  getOrderDetails,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/sales/daily/:date", getDailySales);
router.get("/sales/monthly/:year/:month", getMonthlySales);
router.get("/orders", getOrderDetails);

module.exports = router;
