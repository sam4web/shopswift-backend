const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { shipping, tax } = require("../constants");
const Product = require("../models/product.model");


const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
  }],
});

cartSchema.methods.getPricingDetail = async function() {
  const productsPromiseArray = this.products.map(async product =>
    await Product.findById(product).select("-__v").lean())
  ;
  const products = await Promise.all(productsPromiseArray);
  const subTotal = products.reduce((acc, curr) => acc + curr.price, 0);
  const orderTotal = subTotal + tax + shipping;
  return { tax, shipping, subTotal, orderTotal };
};

module.exports = mongoose.model("Cart", cartSchema);