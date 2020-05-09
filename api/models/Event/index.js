const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const TicketedEventSchema = require('./ticketed');
const TestimonialSchema = require('./testimonial');
const { createSlug, formatDates, formatDatesSmall } = require('./middleware');

const EventSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Please add an event type'],
      enum: ['Event', 'Exhibit', 'Tour'],
      default: 'Event',
    },
    ticketed: {
      type: Boolean,
      required: true,
    },
    admission: {
      type: Boolean,
      required: [true, 'Please add an admission'],
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    tagLine: {
      type: String,
      required: [true, 'Please add a tag line'],
      trim: true,
      maxlength: [50, 'Tag line can not be more than 50 characters'],
    },
    hero: {
      type: String,
      default: 'placeholder.png',
    },
    thumbnail: {
      type: String,
      default: 'placeholder.png',
    },
    banner: {
      type: String,
      default: 'placeholder.png',
    },
    slug: String,
    openingDate: {
      type: String,
      required: [true, 'Please add an opening date'],
      match: [
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        'Opening date must be in format of YYYY-MM-DD',
      ],
    },
    closingDate: {
      type: String,
      required: [true, 'Please add an closing date'],
      match: [
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        'Closing date must be in format of YYYY-MM-DD',
      ],
      validate: {
        validator: function (v) {
          return new Date(v) > new Date(this.openingDate);
        },
        message: 'Closing date must be after opening date',
      },
    },
    formattedOpeningDate: String,
    formattedClosingDate: String,
    formattedClosingDateSmall: String,
    formattedOpeningDateSmall: String,
    openingTime: {
      type: String,
      required: [true, 'Please add an opening time'],
      match: [
        /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
        'Opening time must be in format of HH:MM',
      ],
    },
    closingTime: {
      type: String,
      required: [true, 'Please add a closing time'],
      match: [
        /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/,
        'Closing time must be in format of HH:MM',
      ],
    },
    ageLimit: {
      type: Number,
      required: [true, 'Please add recommended age'],
      default: 0,
      enum: [0, 12, 18],
    },
    shortDescription: {
      type: String,
      required: [true, 'Please add a short description'],
      trim: true,
      maxlength: [200, 'Short description can not be more than 200 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    testimonials: {
      type: [TestimonialSchema],
      validate: {
        validator: function (testimonials) {
          return testimonials.length <= 3;
        },
        message: 'There can not be more than 3 testimonials',
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
    timestamps: true,
    discriminatorKey: 'kind',
  },
);

EventSchema.plugin(mongoosePaginate);

EventSchema.pre('save', createSlug);

EventSchema.pre('save', formatDates);

EventSchema.pre('save', formatDatesSmall);

const Event = mongoose.model('Event', EventSchema);

// Create optional ticketed events
const TicketedEvent = Event.discriminator('TicketedEvent', TicketedEventSchema);

module.exports = { Event, TicketedEvent };
