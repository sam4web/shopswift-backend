const Product = require("../models/product.model");

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).lean();
  if (!products.length)
    return res.status(404).send("No product found.");
  return res.json(products);
};

const createProduct = async (req, res) => {
};

module.exports = { getAllProducts, createProduct };