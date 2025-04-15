const express = require('express');
const { body } = require('express-validator');
const Review = require('../models/review');
const ReviewService = require('../services/reviewService');
const ReviewController = require('../controllers/reviewController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const reviewService = new ReviewService(Review);
const reviewController = new ReviewController(reviewService);

const reviewValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('title').notEmpty().withMessage('Title is required'),
    body('img').notEmpty().withMessage('Image is required'),
    body('star').isInt({ min: 1, max: 5 }).withMessage('Star rating must be between 1 and 5'),
];

router.get('/', reviewController.getAllReviews.bind(reviewController));
router.post('/', reviewValidation, validateRequest, reviewController.createReview.bind(reviewController));
router.post('/all', reviewController.createMultipleReviews.bind(reviewController));

module.exports = router;