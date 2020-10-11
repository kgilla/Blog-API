const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.createPost = [
  body("author").trim().isLength({ min: 1, max: 30 }),
  body("content").trim().isLength({ min: 1, max: 160 }),
  body("postID").trim().isLength({ min: 1, max: 30 }),
  (req, res) => {
    const errors = validationResult(req);
    const { author, content, postID } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        author,
        content,
        postID,
      });
    }

    new Comment({
      author,
      content,
      post: postID,
    }).save((err, comment) => {
      if (err) {
        return res.status(400).json({
          error: err,
          comment,
        });
      }
      Post.findById(postID).exec((err, post) => {
        if (err) {
          return res.status(400).json({
            error: err,
            post,
          });
        }
        post.comments.push(comment);
        Post.findByIdAndUpdate(postID, post, {}, (err, post) => {
          if (err) {
            return res.status(400).json({
              error: err,
              post,
            });
          }
          return res.status(200).json({
            message: "comment saved successfully!",
            comment,
          });
        });
      });
    });
  },
];

exports.deletePost = (req, res) => {
  Comment.findByIdAndDelete(req.params.id, {}, (err, comment) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    Post.findById(comment.post).exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      post.comments.pull(req.params.id);
      Post.findByIdAndUpdate(comment.post, post, {}, (err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
      });
    });

    return res.status(200).json({
      comment,
      message: "Comment deleted successfully",
    });
  });
};
