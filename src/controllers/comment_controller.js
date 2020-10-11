const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.createPost = [
  body("author").trim().isLength({ min: 1, max: 30 }),
  body("content").trim().isLength({ min: 1, max: 160 }),
  (req, res) => {
    const errors = validationResult(req);
    const { author, content } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        author,
        content,
      });
    }

    new Comment({
      author,
      content,
      post: req.params.id,
    }).save((err, comment) => {
      if (err) {
        return res.status(400).json({
          error: err,
          comment,
        });
      }
      Post.findById(req.params.id).exec((err, post) => {
        if (err) {
          return res.status(400).json({
            error: err,
            post,
          });
        }
        post.comments.push(comment);
        Post.findByIdAndUpdate(req.params.id, post, {}, (err, post) => {
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

const deletePost = () => {};
