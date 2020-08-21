const express = require("express");
const router = express.Router();
const postController = require("../controllers/post_controller");
const commentController = require("../controllers/comment_controller");
const passport = require("passport");

router.get(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.createGet
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

router.get(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  postController.updateGet
);
router.post(
  "/:id/update",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);

router.get(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  postController.deleteGet
);
router.post(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

router.get("/", postController.indexGet);
router.get("/:id", postController.postViewGet);

// comment routes
router.get("/:id/comments/create", commentController.createGet);
router.post("/:id/comments/create", commentController.createPost);

module.exports = router;
