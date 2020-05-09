const router = require('express').Router();
const orderRouter = require('./orders');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

// Include other resource route
router.use('/:userId/orders', orderRouter);

router
  .route('/')
  .get(protect, authorize('admin'), advancedResults(User), getUsers)
  .post(protect, authorize('admin'), createUser);

router
  .route('/:id')
  .get(protect, authorize('admin'), getUser)
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
