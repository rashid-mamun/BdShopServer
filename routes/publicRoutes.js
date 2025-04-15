const express = require('express');
const { body } = require('express-validator');
const Blog = require('../models/blog');
const OurTeam = require('../models/ourTeam');
const PublicService = require('../services/publicService');
const PublicController = require('../controllers/publicController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();
const publicService = new PublicService(Blog, OurTeam);
const publicController = new PublicController(publicService);

const blogValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('img').notEmpty().withMessage('Image is required'),
    body('date').notEmpty().withMessage('Date is required'),
];

router.get('/', publicController.getWelcome.bind(publicController));
router.get('/ourteam', publicController.getAllTeamMembers.bind(publicController));
router.get('/blogs', publicController.getAllBlogs.bind(publicController));
router.post('/blogs', blogValidation, validateRequest, publicController.createBlog.bind(publicController));
router.post('/blogs/all', publicController.createMultipleBlogs.bind(publicController));

module.exports = router;