const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment_controller");

// comment routes
router.post("/create", commentController.createPost);
router.post("/:id/delete", commentController.deletePost);

module.exports = router;
