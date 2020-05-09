const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSummarySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    ticketPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const SummarySchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: [true, 'Please add a total price'],
      min: [0, 'Total price can not be less than 0'],
    },
    totalQuantity: {
      type: Number,
      required: [true, 'Please add a total quantity'],
    },
    date: {
      type: String,
      required: [true, 'Please add a date'],
      match: [
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        'Date must be in format of YYYY-MM-DD',
      ],
    },
    tickets: {
      type: [TicketSummarySchema],
      required: [true, 'Please add a ticket summary'],
    },
  },
  { _id: false },
);

module.exports = SummarySchema;
