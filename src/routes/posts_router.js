const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");
const passport = require("passport");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

router.post(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

router.post(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

router.get("/", postController.indexGet);
router.get("/:id", postController.postViewGet);

module.exports = router;
