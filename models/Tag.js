const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  label: { type: String, unique: true, require: true},
})

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;