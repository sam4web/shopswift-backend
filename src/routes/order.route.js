const express = require("express");
const router = express.Router();

const { placeOrder, getAllOrders } = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/verify-token.middleware");

router.use(verifyToken);
router.route("/")
  .get(getAllOrders)
  .post(placeOrder);

module.exports = router;