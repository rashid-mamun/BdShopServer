const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getUserByEmail(req, res) {
        try {
            const user = await this.userService.getUserByEmail(req.params.email);
            successResponse(res, user);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createUser(req, res) {
        try {
            await this.userService.createUser(req.body);
            logger.info('User created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'User created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async updateUser(req, res) {
        try {
            await this.userService.updateUser(req.body.email, req.body);
            logger.info('User updated successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'User updated successfully');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async makeAdmin(req, res) {
        try {
            await this.userService.makeAdmin(req.body.email);
            logger.info('User role updated to admin', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'User role updated to admin');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = UserController;