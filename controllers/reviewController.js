const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }

    async getAllReviews(req, res) {
        try {
            const reviews = await this.reviewService.getAllReviews();
            successResponse(res, reviews);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createReview(req, res) {
        try {
            await this.reviewService.createReview(req.body);
            logger.info('Review created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Review created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createMultipleReviews(req, res) {
        try {
            await this.reviewService.createMultipleReviews(req.body);
            logger.info('Reviews created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Reviews created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = ReviewController;