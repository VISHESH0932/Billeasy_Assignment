const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookById} = require('../controllers/book.controllers');
const authMiddleware = require('../middlewares/auth');
const { createReview } = require('../controllers/review.controllers');

router.post('/', authMiddleware, createBook);
router.get('/', authMiddleware, getBooks);
router.get('/:id', authMiddleware, getBookById);
router.post('/:id/reviews', authMiddleware, createReview);

module.exports = router;