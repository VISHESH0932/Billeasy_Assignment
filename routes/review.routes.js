const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { updateReview, deleteReview } = require('../controllers/review.controllers');

router.put('/:id', authMiddleware, updateReview);
router.delete('/:id', authMiddleware, deleteReview);


module.exports = router;