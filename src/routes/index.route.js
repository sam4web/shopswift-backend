const express = require("express");
const path = require("node:path");
const router = express.Router();

router.get(["/", "/index", "/index.html"], (req, res) => {
  if (req.accepts("html"))
    return res.render("index");
  else if (req.accepts("json"))
    return res.json({ message: "Express Starter Template" });
  else
    return res.type("text").send("Welcome to the Docket API! Manage your personal notes.");
});

module.exports = router;