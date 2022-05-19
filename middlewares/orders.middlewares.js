//Models
const { Orders } = require('../models/order.model');
const { Meal } = require('../models/meal.model');

//utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const req = require('express/lib/request');


const orderExists = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const order = await Orders.findOne({
        where: { id, status: 'active' },
    });

    if (!order) {
        return next(new AppError('order does not exist with given Id', 404));
    }
    req.order = order;
    next();
});



module.exports = {
    orderExists,

};
