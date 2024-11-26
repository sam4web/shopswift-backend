const User = require("../models/user.model");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product.model");

// @route /api/user/:id
// @method GET
const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const user = await User.findById(id).select("-__v -password").lean();
  if (!user)
    return res.status(404).send({ message: "No User with the specified ID was found." });
  return res.json(user);
};

// @route /api/user/:id/products
// @method GET
const getUserProducts = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const products = await Product.find({ createdBy: id }).select("-__v -createdBy").lean();
  if (!products.length)
    return res.status(404).json({ message: "There are no products available." });
  return res.json(products);
};

module.exports = {
  getUserById,
  getUserProducts,
};