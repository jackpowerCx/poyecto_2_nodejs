const dotenv = require('dotenv');

//Models
const { Orders } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { User } = require('../models/user.model');
const { Restaurant } = require('../models/restaurant.model');

//utlis
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

dotenv.config({ path: './config.env' });

const getAllOrders = catchAsync(async (req, res, next) => {

    const order = await Orders.findAll({
        include:
            [
                {
                    model: Meal,
                    //where: { status: 'active' },
                    include: { model: Restaurant },
                },
            ],
    });
    res.status(201).json({ order });
});

const createOrders = catchAsync(async (req, res, next) => {

    const { sessionUser } = req;


    const { quantity, mealId } = req.body;

    const orderPrice = await Meal.findOne({
        where: { id: mealId },
    });
    if (!orderPrice) {
        return next(new AppError('order does not exist with given Id', 404));
    }

    const newOrder = await Orders.create({
        quantity,
        mealId,
        totalPrice: (quantity * orderPrice.price),
        userId: sessionUser.id,
    });


    res.status(201).json({ newOrder });

});

const updateOrders = catchAsync(async (req, res, next) => {
    const { order } = req;

    await order.update({ status: 'completed' });

    res.status(201).json({ order, status: 'success' });
});

const deletOrders = catchAsync(async (req, res, next) => {

    const { order } = req;

    await order.update({ status: 'cancelled' });

    res.status(201).json({ order, status: 'success' });
});

const getordersById = catchAsync(async (req, res, next) => {
    const { order } = req;

    res.status(201).json({ order });
});

module.exports = {
    getAllOrders,
    createOrders,
    updateOrders,
    deletOrders,
    getordersById,
}