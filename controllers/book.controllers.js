const Book = require('../models/book.model');
const Review = require('../models/review.model');

const createBook = async(req,res)=>{
    try{
        const {title, author, genre, description} = req.body;
        const newBook = new Book({
            title,
            author,
            genre,
            description
        });
        await newBook.save();
        return res.status(201).json(newBook);
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
}

const getBooks = async(req,res)=>{
    try{
        const {author,genre,page=1,limit=10} = req.query;
        const filters = {};
        if(author){
            filters.author = new RegExp(author, 'i');
        }

        if(genre){
            filters.genre = new RegExp(genre, 'i');
        }
        
        const skip = (page - 1) * limit;
        const total = await Book.countDocuments(filters);
        const books = await Book.find(filters)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

         res.json({
            total,page:Number(page), pageSize: books.length,books});
    }
    catch(error){
        return res.status(500).json({
            message: error.message,
        });
    }
}

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const stats = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: {
          _id: '$book',
          averageRating: { $avg: '$rating' },
          reviewCount:   { $sum: 1 }
      }}
    ]);
    const avgRating = stats[0] ? stats[0].averageRating : null;
    const count = stats[0] ? stats[0].reviewCount : 0;

    // Get paginated reviews (default page=1, limit=5)
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ book: book._id })
      .populate('user', 'username')
      .skip(skip).limit(parseInt(limit));

    res.json({
      book,
      averageRating: avgRating,
      reviewCount: count,
      reviews
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    getBooks,
    createBook,
    getBookById
}