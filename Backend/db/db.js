// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_URL);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
  }
};

module.exports = connectToDb;
