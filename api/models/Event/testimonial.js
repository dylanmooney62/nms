const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please add testimonial rating'],
      min: [1, 'Rating can not be lower than 1'],
      max: [5, 'Rating can not be higher than 5'],
    },
    quote: {
      type: String,
      required: [true, 'Please add testimonial quote'],
      maxlength: [200, 'Quote can not be more than 200 characters'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Please add testimonial author'],
      trim: true,
    },
  },
  {
    _id: false,
  },
);

module.exports = TestimonialSchema;
