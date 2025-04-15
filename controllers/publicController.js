const { logger } = require('../logging/logger');
const { successResponse, errorResponse } = require('../utils/response');
const CustomError = require('../errors/customError');

class PublicController {
    constructor(publicService) {
        this.publicService = publicService;
    }

    async getWelcome(req, res) {
        successResponse(res, null, 'Welcome to BdShopDb API');
    }

    async getAllTeamMembers(req, res) {
        try {
            const team = await this.publicService.getAllTeamMembers();
            successResponse(res, team);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async getAllBlogs(req, res) {
        try {
            const blogs = await this.publicService.getAllBlogs();
            successResponse(res, blogs);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createBlog(req, res) {
        try {
            await this.publicService.createBlog(req.body);
            logger.info('Blog created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Blog created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }

    async createMultipleBlogs(req, res) {
        try {
            await this.publicService.createMultipleBlogs(req.body);
            logger.info('Blogs created successfully', { correlationId: req.headers['x-correlation-id'] });
            successResponse(res, null, 'Blogs created successfully', 201);
        } catch (error) {
            logger.error(error.message, { correlationId: req.headers['x-correlation-id'] });
            errorResponse(res, error.message, error.statusCode || 500);
        }
    }
}

module.exports = PublicController;