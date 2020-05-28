const path = require('path');
require('colors');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const fs = require('fs');
const mongoose = require('mongoose');
const { Event } = require('./models/Event');
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Order = require('./models/Order');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const events = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'events.json'), 'utf-8'),
);

const orders = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'orders.json'), 'utf-8'),
  'utf-8',
);

const tickets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '_data', 'tickets.json'), 'utf-8'),
  'utf-8',
);

const importData = async () => {
  try {
    await Event.create(events);
    await Order.create(orders);
    await Ticket.create(tickets);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await Event.deleteMany();
    await Ticket.deleteMany();
    await Order.deleteMany();
    // await User.deleteMany();
    console.log('Data deleted...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.bold);
    process.exit();
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please specify: import -i  delete -d'.yellow);
  process.exit();
}
