const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

//models
const { Restaurant } = require('../models/restaurant.model');
const { Meal } = require('../models/meal.model');
const { Reviwes } = require('../models/reviwes.modal');
// Utils
const { catchAsync } = require('../utils/catchAsync');

//models

dotenv.config({ path: './config.env' });


const getAllRestaurants = catchAsync(async (re, res, next) => {

    //const restaurants = await Restaurant.findAll({ where: { status: 'active' } });
    const restaurants = await Restaurant.findAll({
        include: [
            { model: Reviwes },
            {model: Meal },
        ],
    });

    res.status(200).json({
        restaurants,
    });
});

const createRestaurants = catchAsync(async (req, res, next) => {

    const { name, anddress, rating, status } = req.body;

    // INSERT INTO ...
    const newRestaurant = await Restaurant.create({
        name,
        anddress,
        rating,
        status,
    });

    res.status(201).json({ newRestaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, anddress } = req.body;

    await restaurant.update({ name, anddress });

    res.status(200).json({ status: 'success' });
});


const deleteRestaurant = catchAsync(async (req, res, next) => {

    const { restaurant } = req;
    await restaurant.update({ status: 'inactive' });

    res.status(200).json({
        status: 'success',
    });
});


const getRestaurantsById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;

    res.status(200).json({
        restaurant,
    })
});

module.exports = {
    createRestaurants,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantsById,
};