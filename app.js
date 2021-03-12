var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var expressValidator = require('express-validator');
// var bodyParser = require('body-parser')
const adminApiRoutes = require("./routes/adminApiRoutes");
const logApiRoutes = require("./routes/logApiRoutes");
var indexRouter = require("./routes/indexrouters");
var usersRouter = require("./routes/userrouters");
var bookRouter = require("./routes/bookroutes");
require("./models/mongo.js");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
var dotenv = require("dotenv");

dotenv.config();

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminApiRoutes);
app.use("/logs", logApiRoutes);
app.use("/books", bookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
