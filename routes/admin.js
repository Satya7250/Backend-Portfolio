const express = require("express");
const router = express.Router();
const { renderAdminPanel, handleDeleteUser } = require("../controllers/adminController");

router.get("/", renderAdminPanel);
router.post("/delete/:id", handleDeleteUser);

module.exports = router;
