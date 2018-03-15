const mongoose = require("mongoose");
const Book = require("./models/book");
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var books = require("./routes/books");

var app = express();

mongoose.connect("mongodb://localhost/books_db", async function(err) {
  if (err) throw err;

  console.log("Successfully connected");

  // var storyBook = new Book({
  //   _id: new mongoose.Types.ObjectId(),
  //   title: "Ghost story"
  // });

  // await storyBook.save();

  // console.log("Story book successfully saved.");

  // var fictionBook = new Book({
  //   _id: new mongoose.Types.ObjectId(),
  //   title: "Fiction novel"
  // });

  // await fictionBook.save();

  // console.log("Fiction book successfully saved.");

  // var biographyBook = new Book({
  //   _id: new mongoose.Types.ObjectId(),
  //   title: "Biography of Steven Hawkings"
  // });

  // await biographyBook.save();

  // console.log("Biography book successfully saved.");

  // const storySearch = await Book.find({
  //   title: /story/i
  // }).exec();
  // console.log("Found books with with names", storySearch);

  // const fictionSearch = await Book.find({
  //   title: /fiction/i
  // }).exec();
  // console.log("Found books with with names", fictionSearch);

  // const bioBookSearch = await Book.find({
  //   title: /bio/i
  // }).exec();
  // console.log("Found `Biography` books with with name", bioBookSearch);

  // const removeAllBooks = Book.remove(function(err, product) {
  //   if (err) return handleError(err);
  //   console.log(product); // null
  // });

  // await removeAllBooks.exec();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/books", books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
