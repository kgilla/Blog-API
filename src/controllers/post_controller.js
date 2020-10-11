const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = [
  body("title").isLength({ min: 1, max: 160 }),
  body("content").isLength({ min: 1 }),
  body("blurb").isLength({ min: 1, max: 100 }),
  (req, res) => {
    const errors = validationResult(req);
    const { title, content, blurb } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    new Post({
      title,
      content,
      blurb,
      author: req.user._id,
    }).save((err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      User.findById(req.user._id).exec((err, user) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        user.posts.push(post);
        User.findByIdAndUpdate(req.user._id, user, {}, (err) => {
          if (err) {
            return res.status(400).json({
              error: err,
            });
          }
          return res.status(200).json({
            post,
            message: "Post has been successfully created!",
          });
        });
      });
    });
  },
];

// Update
exports.updateGet = (req, res, next) => {
  Post.find({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      post,
    });
  });
};

exports.updatePost = [
  body("title").isLength({ min: 1, max: 160 }),
  body("content").isLength({ min: 1 }),
  body("blurb").isLength({ min: 1, max: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    const { title, content, blurb } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    Post.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        content: content,
        blurb: blurb,
        updated: Date.now(),
      },
      {},
      (err, post) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.status(200).json({
          post,
          message: "Post has been updated successfully",
        });
      }
    );
  },
];

// Delete
exports.deleteGet = (req, res) => {
  Post.find({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      post: post,
    });
  });
};

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, {}, (err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      post,
      message: "Post successfully deleted",
    });
  });
};

// Read
exports.indexGet = (req, res) => {
  Post.find({})
    .populate("author")
    .populate("comments")
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        posts,
      });
    });
};

exports.postViewGet = (req, res) => {
  Post.findById(req.params.id)
    .populate("author")
    .populate("comments")
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        post,
        author: post.author,
      });
    });
};
