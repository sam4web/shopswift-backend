const Product = require("../models/product.model");
const User = require("../models/user.model");
const base64Encode = require("../utils/base64-encode.util");
const { isValidObjectId } = require("mongoose");


// @route /api/products
// @method GET
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).select("-__v").lean();
  if (!products.length)
    return res.status(404).json({ message: "There are no products available." });
  const productsPromiseArray = products.map(async product => {
      const user = await User.findById(product.createdBy).lean();
      product.createdBy = {
        username: user.username,
        id: user._id,
      };
      return product;
    },
  );
  const productsData = await Promise.all(productsPromiseArray);
  return res.json(productsData);
};


// @route /api/products/:id
// @method GET
const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const product = await Product.findById(id).select("-__v").lean();
  if (!product)
    return res.status(404).send({ message: "No product with the specified ID was found." });
  return res.json(product);
};


// @route /api/products
// @method POST
const createProduct = async (req, res) => {
  let { name, price, description, category } = req.body;
  const imageFile = req.files.image;

  name = name?.trim();
  description = description?.trim();
  category = category?.trim().toLowerCase();
  price = Number(price);

  if (isNaN(price) || price < 0)
    return res.status(400).json({ "message": "Please enter a valid price number." });

  if (![name, price, category].every(Boolean))
    return res.status(400).json({ "message": "All fields are required. Please fill all fields." });

  const image = {
    name: imageFile.name,
    data: base64Encode(imageFile.data),
  };

  try {
    const product = await Product.create({ image, name, price, description, category, createdBy: req.userId });
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// @route /api/products/:id
// @method PATCH
const updateProduct = async (req, res) => {
  let { name, price, description, category } = req.body;
  const id = req.params.id;
  const imageFile = req.files.image;

  name = name?.trim();
  description = description?.trim();
  category = category?.trim().toLowerCase();
  price = Number(price);

  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });

  if (isNaN(price) || price < 0)
    return res.status(400).json({ message: "Please enter a valid price number." });

  if (![name, price, category].every(Boolean))
    return res.status(400).json({ message: "All fields are required. Please fill all fields." });

  const product = await Product.findById(id).lean();
  if (!product)
    return res.status(404).send({ message: "No product with the specified ID was found." });

  const doesProductBelongs = product.createdBy.equals(req.userId);
  if (!doesProductBelongs)
    return res.status(400).send({ message: "You are not authorized to update this item as it does not belong to you." });

  const image = {
    name: imageFile.name,
    data: base64Encode(imageFile.data),
  };

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { image, name, price, description, category },
      { new: true },
    );
    return res.json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// @route /api/products/:id
// @method DELETE
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });
  const product = await Product.findById(id).lean();
  if (!product)
    return res.status(404).send({ message: "No product found." });

  const doesProductBelongs = product.createdBy.equals(req.userId);
  if (!doesProductBelongs)
    return res.status(400).send({ message: "You are not authorized to delete this item as it does not belong to you." });

  await Product.findByIdAndDelete(id).lean();
  return res.json({ message: "Product deleted successfully" });
};


// @route /api/auth/products
// @method GET
const getProductsByUser = async (req, res) => {
  const products = await Product.find({ createdBy: req.userId }).select("-__v -createdBy").lean();
  if (!products.length)
    return res.status(404).json({ message: "There are no products available." });
  return res.json(products);
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
};