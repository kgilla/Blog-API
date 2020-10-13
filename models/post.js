const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  blurb: { type: String, required: true },
  blurbImage: { type: String },
  blurbImageAlt: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now() },
  updated: { type: Date },
  published: { type: Boolean, default: false },
});

postSchema.virtual("url").get(function () {
  return "api/posts/" + this._id;
});

module.exports = mongoose.model("Post", postSchema);
