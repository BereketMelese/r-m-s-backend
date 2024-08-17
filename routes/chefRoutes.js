const express = require("express");
const { registerChef, loginChef } = require("../controllers/chefController");

const router = express.Router();

router.post("/register", registerChef);
router.post("/login", loginChef);

module.exports = router;
