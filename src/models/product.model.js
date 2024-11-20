const mongoose = require("mongoose");
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
    enum: [
      "apparels-accessories",
      "automobiles",
      "beauty-health",
      "books-learning",
      "business-industrial",
      "computers-peripherals",
      "electronics-tvs-more",
      "events-happenings",
      "fresh-veggies-meat",
      "furnishings-appliances",
      "jobs",
      "mobile-phone-accessories",
      "music-instruments",
      "pets-adoption-free-stuff",
      "real-estate",
      "services",
      "sports-fitness",
      "toys-video-games",
      "travel-tours-packages",
    ],
  },
  image: {
    type: productImageSchema,
    required: true,
  },
  // created_by: { type: Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);