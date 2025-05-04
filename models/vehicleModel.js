const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    licensePlate: String,
    type: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema);