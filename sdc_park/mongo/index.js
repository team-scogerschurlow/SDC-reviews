const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/reviews';
const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = db;