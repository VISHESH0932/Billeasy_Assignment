const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const bookRoutes = require('./book.routes');
const reviewRoutes = require('./review.routes');
const searchRoutes = require('./search.routes');

router.use('/', userRoutes); 
router.use('/books', bookRoutes);
router.use('/reviews', reviewRoutes);
router.use('/search', searchRoutes);

module.exports = router;
