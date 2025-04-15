const express = require('express');
const { body } = require('express-validator');
const Order = require('../models/order');
const OrderService = require('../services/orderService');
const OrderController = require('../controllers/orderController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const orderService = new OrderService(Order);
const orderController = new OrderController(orderService);

const orderValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('model').notEmpty().withMessage('Model is required'),
    body('img').notEmpty().withMessage('Image is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('phone').matches(/^\+?\d{10,15}$/).withMessage('Invalid phone number'),
    body('status')
        .isIn(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
        .withMessage('Invalid status'),
];

router.post('/', orderValidation, validateRequest, orderController.createOrder.bind(orderController));
router.get('/', orderController.getAllOrders.bind(orderController));
router.get('/:email', orderController.getOrdersByEmail.bind(orderController));
router.put('/:id', orderController.updateOrderStatus.bind(orderController));
router.delete('/:id', orderController.deleteOrder.bind(orderController));

module.exports = router;