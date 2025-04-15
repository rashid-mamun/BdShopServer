const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }

    async createOrder(req, res) {
        try {
            await this.orderService.createOrder(req.body);
            logger.info('Order created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Order created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.orderService.getAllOrders();
            successResponse(res, orders);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async getOrdersByEmail(req, res) {
        try {
            const orders = await this.orderService.getOrdersByEmail(req.params.email);
            successResponse(res, orders);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const order = await this.orderService.updateOrderStatus(req.params.id);
            logger.info('Order status updated successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, order, 'Order status updated successfully');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async deleteOrder(req, res) {
        try {
            await this.orderService.deleteOrder(req.params.id);
            logger.info('Order deleted successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Order deleted successfully');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = OrderController;