const router = require('express').Router();
const createOrder = require('../middleware/createOrder');
const { protect } = require('../middleware/auth');
const { bookEvent } = require('../controllers/book');
const { TicketedEvent } = require('../models/Event');

router.post('/:id', protect, createOrder(TicketedEvent), bookEvent);

module.exports = router;
