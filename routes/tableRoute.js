const express = require("express");

const { addTable } = require("../controllers/tableController");
const router = express.Router();

router.post("/", addTable);

module.exports = router;
