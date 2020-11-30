const mongoose = require('mongoose');

const URI = process.env.MONGO_DEV_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(URI, options);
    console.log('Database connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
