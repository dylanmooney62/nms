const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const SummarySchema = require('./summary');

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please add a user id'],
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Please add an event id'],
    },
    orderNumber: String,
    status: {
      type: String,
      required: [true, 'Please add an order status'],
      enum: ['pending', 'cancelled', 'failed', 'completed', 'refunded'],
      default: 'pending',
    },
    summary: {
      type: SummarySchema,
      required: [true, 'Please add order summary'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  },
);

OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Order', OrderSchema);
