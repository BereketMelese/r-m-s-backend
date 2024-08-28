const express = require("express");
const {
  calculateDailySales,
  calculateMonthlySales,
} = require("../services/salesService");

const router = express.Router();

router.get("/sales/daily", async (req, res) => {
  const { date } = req.query;

  try {
    const salesData = await calculateDailySales(date);
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Fetching daily sales failed." });
  }
});

router.get("/sales/monthly", async (req, res) => {
  const { month, year } = req.query;

  try {
    const salesData = await calculateMonthlySales(month, year);
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Fetching monthly sales failed." });
  }
});

module.exports = router;
