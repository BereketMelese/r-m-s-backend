const express = require("express");
const {
  creatOrder,
  updateOrder,
  getOrders,
} = require("../controllers/orderController");

const { auth, rollCheck } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getOrders); //router.get("/", auth, rollCheck(["admin", "chef"]), getOrders);
router.post("/", creatOrder); //router.post("/", auth, rollCheck(["user"]), creatOrder);
router.patch("/status", updateOrder); //router.patch("/status", auth, rollCheck(["admin", "chef"]), updateOrder);

module.exports = router;
