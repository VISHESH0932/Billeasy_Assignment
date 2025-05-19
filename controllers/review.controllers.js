const Book = require('../models/book.model');
const Review = require('../models/review.model');

const createReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const existing = await Review.findOne({
            book: id,
            user: req.user._id,
        });
        if (existing) {
            return res.status(400).json({ message: 'You have already reviewed this book' });
        }

        const review = await Review.create({
            book: id,
            user: req.user._id,
            rating,
            comment,
        });
        await review.save();
        return res.status(201).json(review);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    } 
};



const updateReview = async (req,res) =>{
    try{
        const reviewId = req.params.id;
        const {rating, comment} = req.body;
        
        const review = await Review.findById(reviewId);
        if(!review){
            return res.status(404).json({message: 'Review not found'});
        }
        if(review.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'You are not authorized to update this review'});
        }

        if(rating){
            review.rating = rating;
        }

        if(comment){
            review.comment = comment;
        }

        await review.save();
        return res.status(200).json(review);
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
};

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await review.deleteOne();
        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
};
