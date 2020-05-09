const asyncHandler = require('express-async-handler');
const StatusHandler = require('../utils/statusHandler');
const Order = require('../models/Order/index');

// @desc      Get Orders
// @route     GET /api/v1/orders
// @route     GET /api/v1/users/:userId/orders
// @access    Private
const getOrders = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const orders = await Order.find({ user: req.params.userId });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get Order
// @route     GET /api/v1/order/id
// @access    Private
const getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(404, `Order with id '${req.params.id} could not be found'`);
  }

  res.status(200).json({ success: true, data: order });
});

module.exports = {
  getOrders,
  getOrder,
};
