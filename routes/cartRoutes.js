const express = require('express');
const { body } = require('express-validator');
const Cart = require('../models/cart');
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const cartService = new CartService(Cart);
const cartController = new CartController(cartService);

const cartValidation = [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('img').notEmpty().withMessage('Image is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

router.post('/', cartValidation, validateRequest, cartController.createCart.bind(cartController));
router.get('/:email', cartController.getCartsByEmail.bind(cartController));
router.delete('/:itemId', cartController.deleteCart.bind(cartController));

module.exports = router;