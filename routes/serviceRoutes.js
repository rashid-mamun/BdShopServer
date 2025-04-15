const express = require('express');
const { body } = require('express-validator');
const Service = require('../models/service');
const ServiceService = require('../services/serviceService');
const ServiceController = require('../controllers/serviceController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const serviceService = new ServiceService(Service);
const serviceController = new ServiceController(serviceService);

const serviceValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('img').notEmpty().withMessage('Image is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('config').notEmpty().withMessage('Config is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('madeIn').notEmpty().withMessage('MadeIn is required'),
];

router.get('/', serviceController.getAllServices.bind(serviceController));
router.get('/:id', serviceController.getServiceById.bind(serviceController));
router.post('/', serviceValidation, validateRequest, serviceController.createService.bind(serviceController));
router.post('/all', serviceController.createMultipleServices.bind(serviceController));
router.delete('/:id', serviceController.deleteService.bind(serviceController));

module.exports = router;