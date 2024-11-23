const express = require("express");
const router = express.Router();

const {
  getProductsFromCart,
  addProductToCart,
  getPricingDetail,
  removeProductFromCart,
} = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/verify-token.middleware");


router.use(verifyToken);

router.route("/")
  .get(getProductsFromCart)
  .post(addProductToCart)
  .delete(removeProductFromCart);

router.route("/pricing")
  .get(getPricingDetail);

module.exports = router;