require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/connectDB");

const app = express();
const PORT = process.env.PORT || 5000;

const { errorHandler } = require("./middlewares/error-handler.middleware");
const { logEvents, logger } = require("./middlewares/logger.middleware.js");
const path = require("node:path");


// connect to MongoDB
connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// views & static files
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/", require("./routes/index.route"));


// catch 404 and forward to error handler
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) return res.render("404");
  else if (req.accepts("json")) return res.json({ message: "Resource not found" });
  else return res.type("text").send("Resource not found. Please check the URL.");
});

// pass any unhandled errors to the error handler
app.use(errorHandler);


// connect to mongoDB
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB.");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

// if any connection error occurs
mongoose.connection.on("error", (err) => {
  console.error(err.message);
  logEvents(err.message, "mongoError.log");
});