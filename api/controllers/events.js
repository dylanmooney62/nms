const url = require('url');
const asyncHandler = require('express-async-handler');
const dot = require('dot-object');
const StatusHandler = require('../utils/statusHandler');
const { Event, TicketedEvent } = require('../models/Event');

// @desc      Get Events
// @route     GET /api/v1/events
// @access    Public
const getEvents = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get Event
// @route     GET /api/v1/event
// @access    Public
const getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new StatusHandler(404, `Event with id '${req.params.id}' not found`),
    );
  }

  res.status(200).json({ success: true, data: event });
});

// @desc      Create Event
// @route     POST /api/v1/event
// @access    Private
const createEvent = asyncHandler(async (req, res) => {
  let create;

  if (req.body.ticketed) {
    create = Event.create({ ...req.body, kind: 'TicketedEvent' });
  } else {
    create = Event.create(req.body);
  }

  const event = await create;

  res.status(201).json({ success: true, data: event });
});

// @desc      Update Event
// @route     PUT /api/v1/event
// @access    Private
const updateEvent = asyncHandler(async (req, res, next) => {
  // convert to dot notation for updating nested documents
  const updateParams = dot.dot(req.body);

  // Check for event
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new StatusHandler(404, `Event with id '${req.params.id}' not found`),
    );
  }

  let update;
  const options = { runValidators: true, new: true };

  // if event is ticketed, update ticketed event
  if (event.ticketed === true) {
    update = TicketedEvent.findByIdAndUpdate(
      req.params.id,
      updateParams,
      options,
    );
  } else {
    update = Event.findByIdAndUpdate(req.params.id, updateParams, options);
  }

  event = await update;

  res.status(200).json({ success: true, data: event });
});

// @desc      Delete Event
// @route     DELETE /api/v1/event
// @access    Private
const deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    return next(
      new StatusHandler(404, `Event with id '${req.params.id}' not found`),
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc      Delete Event
// @route     PUT /api/v1/event/:id/image
// @access    Private
const eventImageUpload = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new StatusHandler(404, `Event with id '${req.params.id}' not found`),
    );
  }

  if (!req.files) {
    return next(new StatusHandler(400, 'Please upload an image'));
  }

  // Get url
  const requestUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.baseUrl,
  });

  // Reduce object to mongoose friendly query
  const update = Object.keys(req.files).reduce((obj, key) => {
    const filename = req.files[key][0].filename;

    // Create url for image
    const imageUrl = `${requestUrl
      .replace('events', 'images')
      .replace('http', 'https')}/${filename}`;

    return {
      ...obj,
      [key]: imageUrl,
    };
  }, {});

  await Event.findByIdAndUpdate(req.params.id, update);

  res.status(200).send({ success: true, data: update });
});

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  eventImageUpload,
};
