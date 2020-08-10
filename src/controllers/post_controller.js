const { body, validationResult } = require("express-validator");
const Post = require("../models/post");

// Create
exports.createGet = (req, res, next) => {
  res.send("create post get");
};

exports.createPost = [
  body("title").isLength({ min: 1, max: 160 }),
  body("content").isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    const { title, content } = req.body;

    console.log(req.user);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    new Post({
      title: title,
      content: content,
      author: req.user._id,
    }).save((err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        post: post,
      });
    });
  },
];

// Update
exports.updateGet = (req, res, next) => {
  res.send("update post get");
};

exports.updatePost = (req, res, next) => {
  res.send("update post post");
};

// Delete
exports.deleteGet = (req, res, next) => {
  res.send("delete post get");
};
exports.deletePost = (req, res, next) => {
  res.send("delete post post");
};

// Read
exports.indexGet = (req, res, next) => {};
