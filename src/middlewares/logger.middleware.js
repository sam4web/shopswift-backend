const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logsDirPath = path.join(__dirname, "..", "..", "logs");

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(logsDirPath))
      await fsPromises.mkdir(logsDirPath);

    await fsPromises.appendFile(
      path.join(logsDirPath, logFileName),
      logItem,
    );
  } catch (err) {
    console.error(err);
  }
};

const loggerMiddleware = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "request.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logEvents, logger: loggerMiddleware };