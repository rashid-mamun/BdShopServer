const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    async createCart(req, res) {
        try {
            await this.cartService.createCart(req.body);
            logger.info('Cart created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Cart created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async getCartsByEmail(req, res) {
        try {
            const carts = await this.cartService.getCartsByEmail(req.params.email);
            successResponse(res, carts);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async deleteCart(req, res) {
        try {
            await this.cartService.deleteCart(req.params.itemId);
            logger.info('Cart deleted successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Cart deleted successfully');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = CartController;