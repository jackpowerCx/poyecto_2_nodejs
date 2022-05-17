const express = require('express');

// Middlewares
const { mealExists } = require('../middlewares/meals.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { protectToken, protectAdmin } = require('../middlewares/users.middlewares');

// Controller
const {

    createMeals,
    getAllMeals,
    getMealById,
    deleteMeal,
    updateMeal,

} = require('../controllers/meals.controller');


const router = express.Router();

router.use(protectToken);
router.get('/', getAllMeals);


router.post('/:id', restaurantExists, createMeals);
router.get('/:id', mealExists, getMealById);
router.patch('/:id',protectAdmin, mealExists, updateMeal);
router.delete('/:id',protectAdmin, mealExists, deleteMeal);

module.exports = { mealsRouter: router };