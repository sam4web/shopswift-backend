const User = require("../models/user.model");
const { isValidObjectId } = require("mongoose");
const Product = require("../models/product.model");

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const user = await User.findById(id).select("-__v -password").lean();
  if (!user)
    return res.status(404).send({ message: "No User with the specified ID was found." });
  return res.json(user);
};

module.exports = { getUserById };