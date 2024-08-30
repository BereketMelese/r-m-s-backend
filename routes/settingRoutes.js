const express = require("express");
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

const router = express.Router();

router.get("/settings", getSettings);
router.patch("/settings", updateSettings);

module.exports = router;
