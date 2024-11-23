const Cart = require("../models/cart.model");
const Order = require("../models/order.model");


// @route /api/order
// @method GET
const getAllOrders = async (req, res) => {
  const orders = await Order.find({ user: req.userId }).select("-__v -user").lean();
  if (!orders.length)
    return res.status(404).json({ message: "There are no orders available." });
  return res.json(orders);
};


// @route /api/order
// @method POST
const placeOrder = async (req, res) => {
  let { firstName, address } = req.body;
  const userId = req.userId;

  firstName = firstName?.trim();
  address = address?.trim();
  if (![firstName, address].every(Boolean))
    return res.status(400).json({ "message": "All fields are required. Please fill all fields." });

  const cart = await Cart.findOne({ user: userId });

  // check if items exist in cart
  if (!cart?.products.length)
    return res.status(404).json({ message: "You have no items in your cart." });

  const pricingDetail = await cart.getPricingDetail();

  // create order model
  const order = await Order.create({
    firstName,
    address,
    products: cart.products,
    cost: pricingDetail.orderTotal,
    date: new Date().toISOString(),
    user: userId,
  });

  // delete cart after order placed
  await Cart.findOneAndDelete({ user: userId });

  const newOrder = await Order.findById(order._id).select("-__v -user").lean();
  return res.json(newOrder);
};


module.exports = {
  getAllOrders,
  placeOrder,
};