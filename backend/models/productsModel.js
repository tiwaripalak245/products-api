const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    min: [0, "price Invalid"],
  },

  rating: {
    type: Number,
    min: [0, "Too low rating"],
    max: [5, "Too high rating"],
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  image: {
    type: String,
  },

  discountPercentage: {
    type: Number,
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
