const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
