const express = require("express");
const router = express.Router();
const { handleIncrementView } = require("../controllers/viewController");

router.post("/view", handleIncrementView);

module.exports = router;
