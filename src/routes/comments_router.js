const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller");

router.get("/create", commentController.createGet);
router.post("/create", commentController.createPost);

module.exports = router;
