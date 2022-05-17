const express = require('express');

const { protectToken } = require('../middlewares/users.middlewares');
const { reviwesExists } = require('../middlewares/reviwes.middlewares');
const { reviwesValidation, checkValidations } = require('../middlewares/validations.middlewares');

const {
    getReviwesById,
    updateReviwes,
    createReviwes,
    deleteReviwes,
} = require('../controllers/reviwes.controller');


const router = express.Router();

router.use(protectToken);


router.post('/:reviweId', reviwesValidation, checkValidations, createReviwes);

router.get('/:id', reviwesExists, getReviwesById);
router.patch('/:id', reviwesExists, updateReviwes);
router.delete('/:id', reviwesExists, deleteReviwes);

module.exports = { reviewsRouter: router };