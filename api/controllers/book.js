const asyncHandler = require('express-async-handler');
const StatusHandler = require('../utils/statusHandler');
const stripe = require('stripe')('sk_test_7KROBuuoPbXkNExA3DWeQxr700w0n41hGD');
const Order = require('../models/Order');

// @desc      Book Event
// @route     POST /api/v1/book/eventID
// @access    Public
const bookEvent = asyncHandler(async (req, res, next) => {
  const order = req.order;
  const user = req.user;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.summary.totalPrice,
    currency: 'gbp',
    metadata: {
      orderId: JSON.stringify(order.id),
      integration_check: 'accept_a_payment',
    },
    receipt_email: user.email,
  });

  res.status(201).json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret,
    order: req.order.id,
  });
});

// @desc      Confirm Booking
// @route     POST /api/v1/webhook
// @access    Private/Stripe
const confirmBooking = asyncHandler(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  let event;

  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return next(new StatusHandler(400, `Webhook Error: ${err.message}`));
  }

  const intent = event.data.object;

  const { orderId } = intent.metadata;

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Update order status and get details
      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        { status: 'completed' },
        {
          new: true,
          runValidators: true,
        },
      )
        .populate({
          path: 'event',
          select: 'name',
        })
        .populate({
          path: 'user',
          select: 'name email',
        });

      // Send order to middleware
      req.order = order;

      console.log(`Order '${orderId}' was successful`.green.bold.underline);

      // Call middleware
      next();

      break;
    case 'payment_intent.failed':
      // Update order to failed
      await Order.findByIdAndUpdate(orderId, { status: 'failed' });
      console.log(
        `Order '${orderId}' was unsuccessful: ${intent.last_payment_error.message}`
          .red.bold.underline,
      );
  }
  res.status(200).send();
});

module.exports = {
  bookEvent,
  confirmBooking,
};
