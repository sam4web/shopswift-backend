const fileExistsMiddleware = (req, res, next) => {
  if (!req.files)
    return res.status(400).json({ message: "Product image required." });
  next();
};

module.exports = { fileExists: fileExistsMiddleware };