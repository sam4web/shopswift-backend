const mongoose = require("mongoose");
const { categories } = require("../constants");
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [...categories],
  },
  image: {
    type: productImageSchema,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);