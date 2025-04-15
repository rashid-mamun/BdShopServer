const { validationResult } = require('express-validator');
const CustomError = require('../errors/customError');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new CustomError(
            errors.array().map(err => err.msg).join(', '),
            400
        );
    }
    next();
};

module.exports = validateRequest;