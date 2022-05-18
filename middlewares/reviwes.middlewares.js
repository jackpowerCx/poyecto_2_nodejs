//Models
const { Reviwes } = require('../models/reviwes.modal');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


const reviwesExists = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const review = await Reviwes.findOne({
        where: { id },
    });

    if (!review) {
        return next(new AppError('Review does not exists with given Id', 404));
    }

    req.review = review;
    next();
});

module.exports = {
    reviwesExists,
}