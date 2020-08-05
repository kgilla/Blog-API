// Create
exports.createGet = (req, res, next) => {
  res.send("create post get");
};

exports.createPost = (req, res, next) => {
  res.send("create post post");
};

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
exports.indexGet = (req, res, next) => {
  res.send("post index");
};
