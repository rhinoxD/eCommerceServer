const mongoose = require('mongoose');
const config = require('./keys');
const db = config.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Database.');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
