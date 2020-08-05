const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: { type: String, required: true, max: 30 },
  content: { type: String, required: true, max: 200 },
  date: { type: Date, default: Date.now() },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", commentSchema);
