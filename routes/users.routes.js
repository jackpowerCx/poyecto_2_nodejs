const express = require('express');

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

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/users.controller');

const router = express.Router();

router.get('/', getAllUsers);

router.post('/signup', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);


router.get('/check-token', checkToken);

router
  .route('/:id')
  //.get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
