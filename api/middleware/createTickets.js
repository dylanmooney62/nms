const Ticket = require('../models/Ticket');
const asyncHandler = require('express-async-handler');
const generateTickets = require('../utils/generateTickets');
const { emailTickets } = require('../utils/emailTickets');
const { TicketedEvent } = require('../models/Event');

const createTickets = async ({ order }, res, next) => {
  try {
    const orderId = order.id;

    // Name of event and it's id
    const { name: event, id: eventId } = order.event;

    // Date, total tickets, and tickets of summary
    const { date, totalQuantity, tickets: ticketSum } = order.summary;

    // User that placed order
    const recipient = order.user;

    // Loop over tickets and then create tickets of type * quantity
    const tickets = ticketSum
      .map(({ type, quantity }) =>
        Array(quantity)
          .fill()
          .map(() => ({ order: orderId, title: event, date, type })),
      )
      .reduce((acc, val) => acc.concat(val), []);

    const ticketData = await Ticket.create(tickets);

    // Generate and email tickets to user
    emailTickets(recipient, await generateTickets(ticketData));

    // Get event
    const eventData = await TicketedEvent.findById(eventId);

    // Remove tickets purchased from event
    await eventData.removeTickets(totalQuantity, date);
  } catch (error) {
    console.error(`Error occurred: ${error}`.bold.red);
  }
};

module.exports = createTickets;
