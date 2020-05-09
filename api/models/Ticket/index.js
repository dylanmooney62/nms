const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const { v4: uuidv4 } = require('uuid');

const TicketSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: [true, 'Please add an order id'],
    },
    title: {
      type: String,
      required: [true, 'Please add ticket title'],
    },
    date: {
      type: String,
      match: [
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        'Opening date must be in format of YYYY-MM-DD',
      ],
    },
    type: {
      type: String,
      enum: ['adult', 'child', 'student', 'retired'],
      required: [true, 'Please add ticket type'],
    },
    QRCode: {
      type: String,
      immutable: false,
    },
    redeemed: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { getters: true }, toObject: { getters: true } },
);

TicketSchema.pre('save', function () {
  this.QRCode = uuidv4();
});

TicketSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Ticket', TicketSchema);
