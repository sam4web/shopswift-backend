const Product = require("../models/product.model");
const base64Encode = require("../utils/base64-encode.util");
const { isValidObjectId } = require("mongoose");


const getAllProducts = async (req, res) => {
  const products = await Product.find({}).lean();
  if (!products.length)
    return res.status(404).send("No product found.");
  return res.json(products);
};


const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const product = await Product.findById(id).select("-__v").lean();
  if (!product)
    return res.status(404).send({ message: "No product found." });
  return res.json(product);
};


const createProduct = async (req, res) => {
  let { name, price, description, category } = req.body;
  const imageFile = req.files.image;

  name = name.trim();
  description = description.trim();
  price = Number(price);

  if (isNaN(price) || price < 0)
    return res.status(400).json({ "message": "Please enter a valid price number." });

  if (![name, price, category].every(Boolean))
    return res.status(400).json({ "message": "All fields are required. Please fill all fields." });

  const image = {
    name: imageFile.name,
    data: base64Encode(imageFile.data),
  };
  await Product.create({ image, name, price, description, category });
  return res.json({ message: "New Product Created." });
};


const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const product = await Product.findByIdAndDelete(id);
  if (!product)
    return res.status(404).send({ message: "No product found." });
  return res.json({ message: "Product deleted successfully" });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  deleteProduct,
};