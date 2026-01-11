const express = require("express");
const router = express.Router();
const { handleCreateUser } = require("../controllers/userController");

router.post("/", handleCreateUser);

module.exports = router;