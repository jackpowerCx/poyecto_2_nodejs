const express = require('express');

// Middlewares
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { reviwesExists } = require('../middlewares/reviwes.middlewares');
const { protectToken } = require('../middlewares/users.middlewares');

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

const router = express.Router();

router.get('/', getAllRestaurants);
router.get('/:id', restaurantExists, getRestaurantsById);

router.use(protectToken);

router
    .route('/')
    .post(createRestaurants);


router
    .route('/:id')
    .patch(restaurantExists, updateRestaurant)
    .delete(restaurantExists, deleteRestaurant);
router
    .route('/reviews/:id')
    .post(restaurantExists, createReviwes)
    .patch(restaurantExists,reviwesExists, updateReviwes)
    .delete(restaurantExists, reviwesExists, deleteReviwes);

module.exports = { restaurantsRouter: router };