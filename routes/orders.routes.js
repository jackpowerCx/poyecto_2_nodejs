const express = require('express');

//Middlewares
const { protectToken } = require('../middlewares/users.middlewares');
const { orderExists } = require('../middlewares/orders.middlewares');


//Controller
const {
    getAllOrders,
    createOrders,
    updateOrders,
    deletOrders,
} = require('../controllers/order.controller');



const router = express.Router();

router.use(protectToken);

router.get('/me', getAllOrders);
router.post('/', createOrders);
router.patch('/:id', orderExists, updateOrders);
router.delete('/:id', orderExists, deletOrders);

module.exports = { ordesRouter: router };