const verifyTokenMiddleware = (req, res, next) => {
  next();
};

module.exports = { verifyToken: verifyTokenMiddleware };