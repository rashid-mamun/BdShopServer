const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const UserService = require('../services/userService');
const UserController = require('../controllers/userController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const userService = new UserService(User);
const userController = new UserController(userService);

const userValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('displayName').notEmpty().withMessage('Display name is required'),
    body('district').notEmpty().withMessage('District is required'),
    body('division').notEmpty().withMessage('Division is required'),
];

const adminValidation = [
    body('email').isEmail().withMessage('Invalid email format'),
];

router.get('/:email', userController.getUserByEmail.bind(userController));
router.post('/', userValidation, validateRequest, userController.createUser.bind(userController));
router.put('/', userValidation, validateRequest, userController.updateUser.bind(userController));
router.put('/admin', adminValidation, validateRequest, userController.makeAdmin.bind(userController));

module.exports = router;