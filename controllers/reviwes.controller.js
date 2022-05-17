//Models
const { Reviwes } = require('../models/reviwes.modal');

// Utils
const { catchAsync } = require('../utils/catchAsync');



const createReviwes = catchAsync(async (req, res, next) => {

    const { restaurant } = req;
    const { sessionUser } = req;
    const { comment, rating } = req.body;

    const newReviwes = await Reviwes.create({
        comment,
        restaurantId: restaurant.id,
        rating,
        userId: sessionUser.id,
    });

    res.status(200).json({ newReviwes });

});

const getReviwesById = catchAsync(async (req, res, next) => {
    const { review } = req;

    res.status(200).json({ review });
});

const updateReviwes = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { sessionUser} =req;
    const { restaurant } = req;
    const { comment, rating } = req.body;

    await review.update({
        comment,
        rating,
        restaurantId: restaurant.id,
        userId: sessionUser.id,
    });

    res.status(200).json({ review, status: 'success' });
});

const deleteReviwes = catchAsync(async (req, res, next) => {
    const { review } = req;

    await review.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });

});


module.exports = {
    createReviwes,
    getReviwesById,
    updateReviwes,
    deleteReviwes,
}