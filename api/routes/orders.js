const router = require('express').Router({ mergeParams: true });
const Order = require('../models/Order/index');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const { getOrders, getOrder } = require('../controllers/orders');

const userPopulate = {
  path: 'user',
  select: 'name email',
};

const eventPopulate = {
  path: 'event',
  select: 'type name',
};

router
  .route('/')
  .get(
    protect,
    authorize('admin'),
    advancedResults(Order, [userPopulate, eventPopulate]),
    getOrders,
  );

router.route('/:id').get(protect, authorize('admin'), getOrder);

module.exports = router;
