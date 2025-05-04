const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    ticketId: String,
    licensePlate: String,
    spotId: String,
    startTime: Date,
    endTime: Date,
    fee: Number
});

module.exports = mongoose.model('Session', sessionSchema);