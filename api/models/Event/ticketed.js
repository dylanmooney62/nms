const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateTickets } = require('./middleware');
const { getPrice, setPrice } = require('./utils');
const {
  checkDate,
  checkAvailability,
  createTicketSummary,
  removeTickets,
} = require('./methods');

const TicketedEventSchema = new Schema(
  {
    ticketsPerDay: {
      type: Number,
      required: [true, 'Please add tickets available per day'],
    },
    ticketPrice: {
      adult: {
        type: Number,
        required: true,
        match: ['Please enter a valid price', /^\d+(\.\d{2})?$/],
        get: getPrice,
        set: setPrice,
      },
      child: {
        type: Number,
        match: ['Please enter a valid price', /^\d+(\.\d{2})?$/],
        get: getPrice,
        set: setPrice,
      },
      student: {
        type: Number,
        match: ['Please enter a valid price', /^\d+(\.\d{2})?$/],
        get: getPrice,
        set: setPrice,
      },
      retired: {
        type: Number,
        match: ['Please enter a valid price', /^\d+(\.\d{2})?$/],
        get: getPrice,
        set: setPrice,
      },
    },
    tickets: Object,
  },
  {
    discriminatorKey: 'kind',
  },
);

// Generate tickets for ticketed events
TicketedEventSchema.pre('save', generateTickets);

TicketedEventSchema.methods.checkDate = checkDate;

TicketedEventSchema.methods.checkAvailability = checkAvailability;

TicketedEventSchema.methods.createTicketSummary = createTicketSummary;

TicketedEventSchema.methods.removeTickets = removeTickets;

module.exports = TicketedEventSchema;
