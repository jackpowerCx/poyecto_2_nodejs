const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');


const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

const restaurantValidation = [

  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('anddress').notEmpty().withMessage(' address cannot be empty'),
  body('rating').notEmpty().withMessage(' Rating cannot be empty'),
  body('status').notEmpty().withMessage(' Status cannot be empty'),
  
];

const reviwesValidation = [
  body('comment').notEmpty().withMessage('Comment cannot in empty'),
  body('rating').notEmpty().withMessage(' Rating cannot be empty'),
];

const mealsValidation = [

  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('price cannot be empty')
    .isNumeric().withMessage('price cannot be empty'),
];

module.exports = {
  createUserValidations,
  checkValidations,
  reviwesValidation,
  mealsValidation,
  restaurantValidation,
};
