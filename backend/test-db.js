const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing connection to:', process.env.MONGO_URI.replace(/\/\/.*:.*@/, '//USER:PASS@'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB Atlas');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILURE: Could not connect');
    console.error(err);
    process.exit(1);
  });
