const compareAsc = require('date-fns/compareAsc');
const validator = require('validator');

function checkDate(date) {
  // Check if date exists for event
  if (!this.tickets[date]) {
    return false;
  }

  // Get todays date and reset time
  const now = new Date(Date.now()).setHours(0, 0, 0, 0);
  const selectedDate = new Date(date).setHours(0, 0, 0, 0);

  // Check user selected date is for today or in the future
  if (compareAsc(selectedDate, now) === -1) {
    return false;
  }

  return true;
}

function createTicketSummary(tickets) {
  // Get available tickets from ticketPrice object
  const allowedTickets = Object.keys(this.ticketPrice);

  // Use toObject to bypass getter, returning unformatted currency
  const ticketPrice = this.ticketPrice.toObject();

  // filter out fake tickets and tickets with negative quantities
  const summary = Object.keys(tickets)
    .filter((key) => allowedTickets.includes(key))
    .filter((key) => tickets[key] > 0)
    .map((key) => ({
      type: key,
      quantity: tickets[key],
      ticketPrice: ticketPrice[key],
      totalPrice: tickets[key] * ticketPrice[key],
    }));

  return summary;
}

function checkAvailability(totalTickets, date) {
  // check total tickets is a number
  if (!validator.isNumeric(totalTickets.toString(), { no_symbols: true })) {
    return false;
  }

  // Check total tickets is positive number
  if (totalTickets <= 0) {
    return false;
  }

  // return true if there are enough tickets available
  return this.tickets[date].available - totalTickets >= 0;
}

async function removeTickets(totalTickets, date) {
  try {
    const query = { _id: this._id };

    const updatedQuantity = this.tickets[date].available - totalTickets;

    // dot notation is required for nested mongoose updates
    const update = {
      [`tickets.${date}.available`]: updatedQuantity,
    };

    await this.constructor.updateOne(query, update);

    console.log('Tickets removed from event'.green.bold);
  } catch (err) {
    console.error(`Error Occurred: ${err}`.red.bold);
  }
}

module.exports = {
  checkDate,
  createTicketSummary,
  checkAvailability,
  removeTickets,
};
