"use strict";

var express = require("express");

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var authRoute = require("./routes/auth");

var userRoute = require("./routes/users");

var catRoute = require("./routes/categories");

var postsRoute = require("./routes/posts");

var multer = require("multer");

var app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
dotenv.config();
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log("Connected"))["catch"](function (err) {
  return console.error(err);
});
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "images");
  },
  filename: function filename(req, file, cb) {
    cb(null, "hello.jpeg");
  }
});
var upload = multer({
  storage: storage
});
app.post("/api/upload", upload.single("file"), function (req, res) {
  res.status(200).json("file has been uploaded");
});
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", catRoute);
app.listen(3000, function (err) {
  if (err) console.error(err);else console.log("The server is running on port 3000");
});