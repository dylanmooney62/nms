const slugify = require('slugify');
const { format, eachDayOfInterval } = require('date-fns');

function createSlug(next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
}

function formatDates(next) {
  // e.g 2020-01-01 = 1st of January
  this.formattedOpeningDate = format(new Date(this.openingDate), 'do MMMM')
    .split(' ')
    .join(' of ');

  this.formattedClosingDate = format(new Date(this.closingDate), 'do MMMM')
    .split(' ')
    .join(' of ');

  next();
}

function formatDatesSmall(next) {
  // e.g 2020-01-01 = 1 Jan
  this.formattedOpeningDateSmall = format(new Date(this.openingDate), 'd MMM');

  this.formattedClosingDateSmall = format(new Date(this.closingDate), 'd MMM');

  next();
}

function generateTickets(next) {
  const dateSpan = eachDayOfInterval({
    start: new Date(this.openingDate),
    end: new Date(this.closingDate),
  }).map((date) => format(date, 'yyyy-MM-dd'));

  this.tickets = dateSpan.reduce(
    (obj, key) => ({
      ...obj,
      [key]: {
        available: this.ticketsPerDay,
      },
    }),
    {},
  );

  next();
}

module.exports = {
  createSlug,
  formatDates,
  formatDatesSmall,
  generateTickets,
};
