const { logEvents } = require("./logger.middleware.js");

const errorHandlerMiddleware = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "error.log",
  );
  res.status(req.statusCode || 500);
  res.json({ message: err.message, isError: true });
};

module.exports = { errorHandler: errorHandlerMiddleware };