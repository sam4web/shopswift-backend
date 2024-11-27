const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const { isValidObjectId } = require("mongoose");


// @route /api/cart
// @method GET
const getProductsFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).lean();

  // check if items exist in cart
  if (!cart?.products.length)
    return res.status(404).json({ message: "You have no items in your cart." });

  try {
    // find products by id and return
    const productsPromiseArray = cart.products.map(async product =>
      await Product.findById(product).select("-__v -createdBy").lean(),
    );
    const products = await Promise.all(productsPromiseArray);
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// @route /api/cart
// @method POST
const addProductToCart = async (req, res) => {
  const productId = req.body.product;
  const userId = req.userId;

  if (!productId)
    return res.status(400).json({ message: "A product must be provided." });

  // check if product id is valid
  if (!isValidObjectId(productId))
    return res.status(400).json({ message: "Invalid ID provided. Please check and try again." });

  // check if product exists
  const product = await Product.findById(productId).select("-__v").lean();
  if (!product)
    return res.status(404).json({ message: "No product with the specified ID was found." });

  // check if product belongs to user
  const doesProductBelongs = product.createdBy.equals(userId);
  if (doesProductBelongs)
    return res.status(400).json({ message: "You cannot add this item to the cart as it belongs to you." });

  const existingCart = await Cart.findOne({ user: req.userId });

  // check if cart exists, if no then create one
  if (!existingCart) {
    await Cart.create({ user: userId, products: [productId] });
    return res.json(product);
  }

  // check if product exists in cart
  const duplicateProduct = existingCart.products.filter(product => product.equals(productId));
  if (duplicateProduct.length)
    return res.status(400).json({ message: "Product already exists in your cart." });

  // add product to cart
  existingCart.products.push(productId);
  existingCart.save();
  return res.json(product);
};


// @route /api/cart/:id
// @method DELETE
const removeProductFromCart = async (req, res) => {
  const productId = req.params.id;

  if (!isValidObjectId(productId))
    return res.status(400).send({ message: "Invalid ID provided. Please check and try again." });

  if (!productId)
    return res.status(400).json({ message: "A product must be provided." });

  const cart = await Cart.findOne({ user: req.userId });

  // check if items exists in cart
  if (!cart?.products.length)
    return res.status(404).json({ message: "You have no items in your cart." });

  // check if cart includes product
  if (!cart.products.includes(productId))
    return res.status(400).json({ message: "Product does not exist in your cart." });

  // remove product from cart & save
  cart.products = cart.products.filter(product => !product.equals(productId));
  cart.save();
  return res.sendStatus(204);
};


// @route /api/cart/pricing
// @method GET
const getPricingDetail = async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId });

  // check if items exists in cart
  if (!cart?.products.length)
    return res.status(404).json({ message: "You have no items in your cart." });

  try {
    const pricing = await cart.getPricingDetail();
    return res.json(pricing);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProductsFromCart,
  addProductToCart,
  removeProductFromCart,
  getPricingDetail,
};
