const express = require('express');

// Middlewares
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { reviwesExists, restaurantsValidation } = require('../middlewares/reviwes.middlewares');
const { protectToken, protectAdmin } = require('../middlewares/users.middlewares');

//controller
const {
    createRestaurants,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsById,
} = require('../controllers/restaurants.controller');

const {
    createReviwes,
    updateReviwes,
    deleteReviwes
} = require('../controllers/reviwes.controller');
const { checkValidations, restaurantValidation, reviwesValidation} = require('../middlewares/validations.middlewares');

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', restaurantExists, getRestaurantsById);

router.use(protectToken);

router
    .route('/')
    .post(restaurantValidation, checkValidations, createRestaurants);


router
    .route('/:id')
    .patch(restaurantExists, updateRestaurant)
    .delete(restaurantExists, deleteRestaurant);
router
    .route('/reviews/:id')
    .post(restaurantExists,reviwesValidation, checkValidations, createReviwes);

    
router.use(protectAdmin);
router
    .route('/reviews/:id')
    .patch(restaurantExists, reviwesExists, reviwesValidation, checkValidations, updateReviwes)
    .delete(restaurantExists, reviwesExists, reviwesValidation, checkValidations, deleteReviwes);

module.exports = { restaurantsRouter: router };