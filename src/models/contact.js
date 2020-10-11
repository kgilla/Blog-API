const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  date: { type: Date, default: Date.now() },
  name: { type: String, required: true, max: 30 },
  email: { type: String, required: true, max: 200 },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
