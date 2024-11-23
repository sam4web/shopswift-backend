const express = require("express");
const router = express.Router();

const { register } = require("../controllers/register.controller");
const { login } = require("../controllers/login.controller");
const { refresh } = require("../controllers/refresh.controller");
const { logout } = require("../controllers/logout.controller");
const { verifyToken } = require("../middlewares/verify-token.middleware");
const { getProductsByUser } = require("../controllers/product.controller");


router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

router.use(verifyToken);
router.post("/logout", logout);
router.get("/products", getProductsByUser);

module.exports = router;