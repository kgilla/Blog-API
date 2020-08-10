const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now() },
  published: { type: Boolean, default: false },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

postSchema.virtual("url").get(function () {
  return "api/posts/" + this._id;
});

module.exports = mongoose.model("Post", postSchema);
