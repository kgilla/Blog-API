const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

router.post("/login", userController.loginPost);

module.exports = router;
