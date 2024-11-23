const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
  }],
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Order", orderSchema);