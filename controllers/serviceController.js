const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class ServiceController {
    constructor(serviceService) {
        this.serviceService = serviceService;
    }

    async getAllServices(req, res) {
        try {
            const services = await this.serviceService.getAllServices();
            successResponse(res, services);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async getServiceById(req, res) {
        try {
            const service = await this.serviceService.getServiceById(req.params.id);
            successResponse(res, service);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createService(req, res) {
        try {
            await this.serviceService.createService(req.body);
            logger.info('Service created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Service created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createMultipleServices(req, res) {
        try {
            await this.serviceService.createMultipleServices(req.body);
            logger.info('Services created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Services created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async deleteService(req, res) {
        try {
            await this.serviceService.deleteService(req.params.id);
            logger.info('Service deleted successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Service deleted successfully');
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = ServiceController;