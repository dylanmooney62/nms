const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { confirmBooking } = require('../controllers/book');
const createTickets = require('../middleware/createTickets');

router.post(
  '/',
  bodyParser.raw({ type: 'application/json' }),
  confirmBooking,
  createTickets,
);

module.exports = router;
