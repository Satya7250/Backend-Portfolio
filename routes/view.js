const express = require("express");
const router = express.Router();
const { handleIncrementView } = require("../controllers/viewController");

// POST route for incrementing view count
router.post("/view", handleIncrementView);

// GET route for testing (optional - can be removed later)
router.get("/view", (req, res) => {
  res.json({ message: "View endpoint is working. Use POST to increment count." });
});

module.exports = router;
