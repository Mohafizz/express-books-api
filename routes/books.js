var express = require("express");
var router = express.Router();
const Book = require("../models/book");

/* GET books listing. */
router.get("/", async function(req, res, next) {
  try {
    const allBooksSearch = await Book.find({}).exec();
    res.send({ message: allBooksSearch });
  } catch (err) {
    next(err);
  }
  res.end;
});

router.get("/:title", async function(req, res, next) {
  let title = req.params.title;
  try {
    const titleSearch = await Book.findOne({ title }).exec();
    console.log("{ title: title }: ", { title: title });
    res.send({ searched: `${req.params.title}`, titleSearch });
  } catch (err) {
    next(err);
  }
  res.end;
});

router.post("/createBook", async function(req, res, next) {
  let title = req.body.title;
  try {
    var newBook = new Book({
      title: title
    });
    await newBook.save();
    res.send({ message: `New book created with title: ${req.body.title}` });
  } catch (err) {
    next(err);
  }
});

router.put("/updateTitle", function(req, res) {
  let updateTitle = req.params.res.json({
    message: `update book with id ${req.params.id}`
  });
});

router.delete("/:id", function(req, res) {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
