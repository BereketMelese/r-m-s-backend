const express = require("express");
const {
  creatOrder,
  updateOrder,
  getOrders,
} = require("../controllers/orderController");

const { auth, rollCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getOrders);
router.post("/", creatOrder);
router.patch("/status", updateOrder);

module.exports = router;
