const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: String,
  link: String
});

let article = mongoose.model("article", articleSchema);

module.exports = article;
