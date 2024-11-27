const MAX_SIZE = 5 * 1024 * 1024;

const fileSizeMiddleware = (req, res, next) => {
  if (!req.files) return next();
  const fileSize = req.files["image"].size;
  if (fileSize > MAX_SIZE)
    return res.status(400).json({ message: "Please upload an image smaller than 5 MB." });
  next();
};

module.exports = { fileSize: fileSizeMiddleware };