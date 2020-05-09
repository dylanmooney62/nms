const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.bold.underline,
    );
  } catch (error) {
    console.log(`Unable to connect to database: ${error.message}`.red.bold);
  }
};

module.exports = connectDB;
