const StatusHandler = require('../utils/statusHandler');
const Order = require('../models/Order');
const asyncHandler = require('express-async-handler');

const createOrder = (TicketedEvent) =>
  asyncHandler(async (req, res, next) => {
    // Check for event
    const event = await TicketedEvent.findById(req.params.id);

    if (!event) {
      return next(
        new StatusHandler(400, `Event with id '${req.params.id} not found'`),
      );
    }

    const { date } = req.body;

    const dateExists = event.checkDate(date);

    // Check date exists for selected event
    if (!dateExists) {
      return next(new StatusHandler(400, `Please select a valid date`));
    }

    const { tickets } = req.body;

    // Create summary of tickets
    const ticketSummary = event.createTicketSummary(tickets);

    // Check ticket summary is not empty
    if (ticketSummary.length === 0) {
      return next(new StatusHandler(400, `Please select tickets to book`));
    }

    // calculate total quantity of tickets
    const totalTickets = ticketSummary.reduce(
      (accum, { quantity }) => accum + quantity,
      0,
    );

    // Check total quantity is not 0
    if (totalTickets === 0) {
      return next(new StatusHandler(400, `Please select tickets to book`));
    }

    // Check there is enough tickets for selected date
    const isAvailable = event.checkAvailability(totalTickets, date);

    if (!isAvailable) {
      return next(
        new StatusHandler(
          400,
          `Not enough tickets available for selected date`,
        ),
      );
    }

    const totalPrice = ticketSummary.reduce(
      (accum, { totalPrice }) => accum + totalPrice,
      0,
    );

    // Check total price is exists, if not process went wrong
    if (!totalPrice) {
      return next(
        new StatusHandler(400, `Something went wrong, please try again`),
      );
    }

    const summary = {
      date,
      totalPrice,
      totalQuantity: totalTickets,
      tickets: ticketSummary,
    };

    const order = await Order.create({
      user: req.user.id,
      event: req.params.id,
      status: 'pending',
      summary,
    });

    req.order = order;

    next();
  });

module.exports = createOrder;
