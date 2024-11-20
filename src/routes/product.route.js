const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");
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

router.route("/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(
    fileUpload({ createParentPath: true }),
    fileExists,
    fileExtension([".jpg", ".jpeg", ".png"]),
    fileSize,
    updateProduct,
  );

module.exports = router;