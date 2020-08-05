const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");

router.get("/create", postController.createGet);
router.post("/create", postController.createPost);

router.get("/update", postController.updateGet);
router.post("/update", postController.updatePost);

router.get("/delete", postController.deleteGet);
router.get("/delete", postController.deletePost);

router.get("/", postController.indexGet);

module.exports = router;
