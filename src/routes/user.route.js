const express = require("express");
const { getUserById } = require("../controllers/user.controller");
const router = express.Router();

router.route("/:id")
  .get(getUserById);

module.exports = router;