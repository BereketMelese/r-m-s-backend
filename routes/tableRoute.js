const express = require("express");

const { addTable } = require("../controllers/tableController");
const router = express.Router();

// router.get("/", addTable);
router.post("/", addTable);

module.exports = router;
