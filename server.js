require('dotenv').config();
require('colors');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./api/config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./api/middleware/errorHandler');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Resource routes
const webhook = require('./api/routes/webhook');
const events = require('./api/routes/events');
const images = require('./api/routes/images');
const auth = require('./api/routes/auth');
const users = require('./api/routes/users');
const book = require('./api/routes/book');
const orders = require('./api/routes/orders');
const tickets = require('./api/routes/tickets');

// Logger for development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Allow cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

// Allows use of Cookies
app.use(cookieParser());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(limiter);

// This is first as webhook requires raw buffer of body
app.use('/api/v1/webhook', webhook);

// Rest of routes require json result of body
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set static folder
app.use(express.static(path.join(__dirname, 'front-end', 'build')));
app.use(express.static(path.join(__dirname, 'api', 'public')));

app.get('/api/v1', (req, res) => {
  res.sendFile(path.join(__dirname, 'api', 'public', 'index.html'));
});

app.use('/api/v1/events', events);
app.use('/api/v1/images', images);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/book', book);
app.use('/api/v1/orders', orders);
app.use('/api/v1/tickets', tickets);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'front-end', 'build', 'index.html'));
});

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode...`.green
      .inverse,
  ),
);
