const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

// router.get("/create", userController.createGet);
// router.post("/create", userController.createPost);

router.get("/login", userController.loginGet);
router.post("/login", userController.loginPost);

module.exports = router;
