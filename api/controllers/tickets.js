const statusHandler = require('../utils/statusHandler');
const asyncHandler = require('express-async-handler');
const Ticket = require('../models/Ticket');

const getTickets = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

const redeemTicket = asyncHandler(async (req, res, next) => {
  const QRCode = req.params.QRCode;

  const ticket = await Ticket.findOne({ QRCode });

  if (!ticket) {
    return next(
      new statusHandler(404, `Ticket with QR Code '${QRCode}' not found`),
    );
  }

  if (ticket.redeemed) {
    return next(
      new statusHandler(
        403,
        `Ticket with QR Code '${QRCode}' has already been redeemed`,
      ),
    );
  }

  // Update status of ticket to redeemed
  const updatedTicket = await Ticket.findByIdAndUpdate(
    ticket.id,
    { redeemed: true },
    {
      runValidators: true,
      new: true,
    },
  );

  res.status(200).json({ success: true, data: updatedTicket });
});

module.exports = {
  getTickets,
  redeemTicket,
};
