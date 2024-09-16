const express = require("express");
const { getDashboardData } = require("../controllers/Dashboard");

const router = express.Router();

router.get("/data", getDashboardData);

module.exports = router;
