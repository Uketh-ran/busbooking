const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  title: String,
  offer: String,
  valid: String,
  image: String,
  bg: String
});

module.exports = mongoose.model("Carousel", carouselSchema);
