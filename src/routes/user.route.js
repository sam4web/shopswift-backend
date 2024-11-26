const express = require("express");
const { getUserById, getUserProducts } = require("../controllers/user.controller");
const router = express.Router();

router.get("/:id", getUserById);
router.get("/:id/products", getUserProducts);

module.exports = router;