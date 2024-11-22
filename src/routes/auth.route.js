const express = require("express");
const router = express.Router();

const { register } = require("../controllers/register.controller");
const { login } = require("../controllers/login.controller");
const { refresh } = require("../controllers/refresh.controller");
const { logout } = require("../controllers/logout.controller");
const { verifyToken } = require("../middlewares/verify-token.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", verifyToken, logout);

module.exports = router;