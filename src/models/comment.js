const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  date: { type: Date, default: Date.now() },
  author: { type: String, required: true, max: 30 },
  content: { type: String, required: true, max: 200 },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
