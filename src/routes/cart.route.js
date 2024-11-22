const express = require("express");
const {
  getProductsFromCart,
  addProductToCart,
  getPricingDetail,
  removeProductFromCart,
} = require("../controllers/cart.controller");
const router = express.Router();

router.route("/")
  .get(getProductsFromCart)
  .post(addProductToCart)
  .delete(removeProductFromCart);

router.route("/pricing")
  .get(getPricingDetail);

module.exports = router;