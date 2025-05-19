const Book = require('../models/book.model');

const searchBooks = async (req, res) => {
  try {
    const q = req.query.q || '';
    const regex = new RegExp(q, 'i'); 
    const books = await Book.find({
      $or: [
        { title: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {searchBooks};
