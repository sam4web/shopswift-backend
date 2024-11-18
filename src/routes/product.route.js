const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const { getAllProducts, createProduct } = require("../controllers/product.controller");
const { fileExists } = require("../middlewares/file-exists.middleware");
const { fileExtension } = require("../middlewares/file-extension.middleware");
const { fileSize } = require("../middlewares/file-size.middleware");

router.route("/")
  .get(getAllProducts)
  .post(
    fileUpload({ createParentPath: true }),
    fileExists,
    fileExtension([".jpg", ".jpeg", ".png"]),
    fileSize,
    createProduct,
  );


module.exports = router;