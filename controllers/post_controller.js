const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

exports.createPost = [
  body("title").isLength({ min: 1 }),
  body("content").isLength({ min: 1 }),
  body("blurb").isLength({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);
    const { title, content, blurb, blurbImage, blurbImageAlt } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    new Post({
      title,
      content,
      blurb,
      blurbImage,
      blurbImageAlt,
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

exports.updatePost = [
  body("title").isLength({ min: 1 }),
  body("content").isLength({ min: 1 }),
  body("blurb").isLength({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    const { title, content, blurb, blurbImage, blurbImageAlt } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        blurb,
        blurbImage,
        blurbImageAlt,
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

exports.deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, {}, (err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    User.findById(post.author).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      user.posts.pull(req.params.id);
      User.findByIdAndUpdate(post.author, user, {}, (err) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
      });
    });
    return res.status(200).json({
      post,
      message: "Post successfully deleted",
    });
  });
};

// Read
exports.indexGet = (req, res) => {
  Post.find()
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
      });
    });
};

exports.publish = (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    post.published = post.published ? false : true;
    Post.findByIdAndUpdate(req.params.id, post, {}, (err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        message: "Post updated successfully",
      });
    });
  });
};
