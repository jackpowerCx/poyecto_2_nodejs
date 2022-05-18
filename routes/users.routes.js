const express = require('express');

//models
const { getordersById } = require('../controllers/order.controller');
// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const {
  orderExists
} = require('../middlewares/orders.middlewares');
// Controller
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/users.controller');

const { getAllOrders } = require('../controllers/order.controller');
const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/check-token', checkToken);

router.get('/orders', getAllOrders);
router.get('/orders/:id', orderExists, getordersById);

router
  .route('/:id')
  //.get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
