const express = require("express");
const {
  creatOrder,
  updateOrder,
  getOrders,
} = require("../controllers/orderController");

const { auth, rollCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", creatOrder); //router.post("/", auth, rollCheck(["user"]), creatOrder);
router.patch("/status", updateOrder); //router.patch("/status", auth, rollCheck(["admin", "chef"]), updateOrder);
router.get("/", auth, getOrders); //router.get("/", auth, rollCheck(["admin", "chef"]), getOrders);

module.exports = router;
