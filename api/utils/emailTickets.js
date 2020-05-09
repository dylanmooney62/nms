const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.BUSINESS_EMAIL,
    pass: process.env.BUSINESS_PASS,
  },
});

const emailTickets = (recipient, tickets) => {
  const { name, email } = recipient;

  const mailOptions = {
    from: process.env.BUSINESS_EMAIL,
    to: email,
    subject: 'Thank you for your order',
    text: `Hi, ${name}. \n Thank you for your order. \n Your tickets are attached below`,
    html: `<p>Hello ${name},</p> <p>Thank you for your order.</p> <p>Please find and print the attached tickets for your visit.</p>`,
    attachments: [
      {
        filename: 'tickets.pdf',
        content: tickets,
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Errors Occurred'.red.bold, err);
    } else {
      console.log('Email sent!'.cyan.inverse.bold);
    }
  });
};

const emailPasswordToken = async (recipient, resetUrl) => {
  const { name, email } = recipient;

  const mailOptions = {
    from: process.env.BUSINESS_EMAIL,
    to: email,
    subject: 'Password Reset',
    text: `Hi, ${name}. \n You are receiving this email because you (or someone else) has requested the reset of a password. Please click the link to update your password. ${resetUrl}`,
    html: `<p>Hello ${name},</p> <p>You are receiving this email because you (or someone else) has requested the reset of a password. Please click the link to update your password. </p> ${resetUrl}`,
  };

  await transporter.sendMail(mailOptions);

  console.log('Email sent!'.cyan.inverse.bold);
};

module.exports = { emailTickets, emailPasswordToken };
