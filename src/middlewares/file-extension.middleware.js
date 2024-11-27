const path = require("node:path");

const fileExtensionMiddleware = (allowedExtensions) => {
  return (req, res, next) => {
    if (!req.files) return next();
    const fileExtension = path.extname(req.files["image"].name);
    if (!allowedExtensions.includes(fileExtension))
      return res.status(400).json({ message: "Only .jpeg, .jpg, and .png file formats are allowed." });
    next();
  };
};

module.exports = { fileExtension: fileExtensionMiddleware };
