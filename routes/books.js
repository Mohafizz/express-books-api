var express = require("express");
var router = express.Router();
const Book = require("../models/book");

/* GET books listing. */
router.get("/", async function(req, res, next) {
  try {
    const allBooksSearch = await Book.find({}).exec();
    res.send({
      message: "List of all books in our database...",
      allBooksSearch
    });
  } catch (err) {
    next(err);
  }
  res.end;
});

router.get("/:title", async function(req, res, next) {
  let title = req.params.title;
  try {
    const titleSearch = await Book.find({
      title: new RegExp(title, "i")
    }).exec();
    console.log("{ title: title }: ", { title: title });
    res.send({ "searched keyword": `${req.params.title}`, titleSearch });
  } catch (err) {
    next(err);
  }
  res.end;
});

router.post("/createBook", async function(req, res, next) {
  let title = req.body.title;
  let author = req.body.author;
  try {
    var newBook = await new Book({
      title: title,
      author: author
    }).save();
    res.send({
      message: `New book created with title: ${req.body.title} with author: ${
        req.body.author
      }`
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/updateTitle/:title", async function(req, res, next) {
  let findTitle = req.params.title;
  let updateTitle = req.body.title;
  try {
    //
    const titleSearch = await Book.findOneAndUpdate({
      title: new RegExp(findTitle, "i"),
      title: updateTitle,
      new: true
    })
      .exec()
      .save();
    console.log(titleSearch);
  } catch (e) {}
  res.send({
    message: `Book updated with new title...`,
    updateTitle
  });
});

router.delete("delete/:title", async function(req, res, next) {
  let findTitle = req.params.title;
  try {
    const titleSearch = await Book.findOneAndRemove({
      title: new RegExp(findTitle, "i")
    }).exec();
  } catch (e) {}
  res.send({
    message: `Book with title ${deleteBook} successfully deleted...`
  });
});

module.exports = router;
