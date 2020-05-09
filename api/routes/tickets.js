const router = require('express').Router();
const { getTickets, redeemTicket } = require('../controllers/tickets');
const advancedResults = require('../middleware/advancedResults');
const Ticket = require('../models/Ticket');
const { protect, authorize } = require('../middleware/auth');

router.get('/', advancedResults(Ticket), getTickets);

router
  .route('/:QRCode/redeem')
  .put(protect, authorize('admin', 'employee'), redeemTicket);

module.exports = router;
