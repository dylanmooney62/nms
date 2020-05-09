const router = require('express').Router();
const advancedResults = require('../middleware/advancedResults');
const imageUpload = require('../middleware/imageUpload');
const { Event } = require('../models/Event');
const { protect, authorize } = require('../middleware/auth');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  eventImageUpload,
} = require('../controllers/events');

router
  .route('/')
  .get(advancedResults(Event), getEvents)
  .post(protect, authorize('admin'), createEvent);

const uploadFields = imageUpload.fields([
  { name: 'hero', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]);

router
  .route('/:id/images')
  .put(protect, authorize('admin'), uploadFields, eventImageUpload);

router
  .route('/:id')
  .get(getEvent)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

module.exports = router;
