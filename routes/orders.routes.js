const express = require('express');

//Middlewares
const { protectToken } = require('../middlewares/users.middlewares');


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
router.patch('/:id', updateOrders);
router.delete('/:id', deletOrders);

module.exports = { ordesRouter: router };