const dotenv = require('dotenv');

//Models
const { Orders } = require('../models/order.model');
const { Meal } = require('../models/meal.model')

//utlis
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const getAllOrders = catchAsync(async (req, res, next) => {


    const orders = await Orders.findAll({

        where: { status: 'active' },
        include: {
            model: Meal,
        },
    })
    res.status(201).json({ orders });
});

const createOrders = catchAsync(async (req, res, next) => {

    const { meal } = req;
    const { quantity } = req.body;

    const newOrder = await Orders.create({
        quantity: (meal.price * quantity),
        mealId: meal.id,
    });
    res.status(201).json({ newOrder });
});

const updateOrders = catchAsync(async (req, res, next) => {
    res.status(201).json({});
});

const deletOrders = catchAsync(async (req, res, next) => {
    res.status(201).json({});
});


module.exports = {
    getAllOrders,
    createOrders,
    updateOrders,
    deletOrders,
}