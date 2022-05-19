const express = require('express');

// Middlewares
const { mealExists } = require('../middlewares/meals.middlewares');
const { restaurantExists } = require('../middlewares/restaurants.middlewares');
const { protectToken, protectAdmin } = require('../middlewares/users.middlewares');
const { checkValidations, mealsValidation } = require('../middlewares/validations.middlewares');
// Controller
const {

    createMeals,
    getAllMeals,
    getMealById,
    deleteMeal,
    updateMeal,

} = require('../controllers/meals.controller');


const router = express.Router();

router.get('/', getAllMeals);
router.get('/:id', mealExists, getMealById);

router.use(protectToken);


router.post('/:id', mealsValidation, checkValidations, restaurantExists, createMeals);

router.use(protectAdmin);
router.patch('/:id',  mealExists, updateMeal);
router.delete('/:id',  mealExists, deleteMeal);

module.exports = { mealsRouter: router };