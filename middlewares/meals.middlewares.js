//Molde
const { Meal }=require('../models/meal.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


const mealExists = catchAsync(async(req,res,next)=> {
    
    const { id } = req.params;
    
    const meal = await Meal.findOne({
        where: { id ,status: 'active' },
    });

    if (!meal) {
        return next(new AppError('Meal does not exist with given Id', 404));
    }

    req.meal = meal;
    next();
});



module.exports = {
    mealExists,
    
};