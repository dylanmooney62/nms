const path = require('path');
const fs = require('fs');
const format = require('date-fns/format');
const PDFDocument = require('pdfkit');
const QRGenerator = require('../QRGenerator');
const {
  addTemplate,
  addTextBlock,
  addQRCode,
  addTicketType,
} = require('./utils');

const poppinsBold = path.join(__dirname, '../../assets/fonts/Poppins-Bold.ttf');
const template = path.join(__dirname, '../../assets/templates/ticket.png');

const generateTickets = async (tickets) => {
  const doc = new PDFDocument({
    modifying: false,
  });

  // Assign x and y to default pdf margins
  const x = 72;
  let y = 72;

  let created = 0;

  for (ticket of tickets) {
    await generateTicket(doc, x, y, ticket);

    // Suitable space for new ticket
    y += 165;

    // Update number of tickets created
    created += 1;

    // Add new page if 4 tickets have been created
    if (created % 4 === 0) {
      doc.addPage();
      y = doc.page.margins.top;
    }
  }

  doc.end();

  const pdfBuffer = await new Promise((resolve) => {
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));

    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);

      resolve(pdfData);
    });
  });

  return pdfBuffer;
};

const generateTicket = async (doc, x, y, ticket) => {
  const { title, date, type, QRCode } = ticket;

  // Add template image
  addTemplate(doc, template, x, y);

  // Declare default font
  doc.font(poppinsBold);

  // Start of details section on ticket (X Axis)
  const details = x + 153;

  // Event name
  doc
    .fontSize(11)
    .fill('#FFF')
    .text(title.toUpperCase(), details, y + 15);

  // options for day and date
  const textBlock = {
    fontSize: 16,
    paddingX: 5,
    characterSpacing: 1,
  };

  // Event Day
  addTextBlock(
    doc,
    format(new Date(date), 'eeee').toUpperCase(),
    details,
    y + 40,
    textBlock,
  );

  // Event Date
  addTextBlock(
    doc,
    format(new Date(date), 'd MMM').toUpperCase(),
    details,
    y + 70,
    textBlock,
  );

  // Tear off section
  const tearOff = x + 326;

  // Requires own function as it centers within ticket tear off
  addTicketType(doc, `${type.toUpperCase()} TICKET`, tearOff, y + 47, {
    paddingX: 4,
    paddingY: 0,
  });

  const QR = await QRGenerator(QRCode);

  addQRCode(doc, QR, tearOff + 18, y + 74);
};

module.exports = generateTickets;
