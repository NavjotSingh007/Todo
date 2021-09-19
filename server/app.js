var express = require("express");
var bodyParser = require("body-parser");

var tasksRouter = require("./controllers/task.controller");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require("cors");

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
  })
);

app.use("/tasks", tasksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.error(err);
  // render the error page
  res.status(err.status || 500);
  res.json({
    operation: "FAILED",
    message: err.message,
  });
});

module.exports = app;
