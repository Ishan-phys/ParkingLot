const parkingService = require('../services/parkingServices');

exports.parkVehicle = async (req, res) => {
    try {
        const { licensePlate, type } = req.body;
        const ticketId = await parkingService.parkVehicle(licensePlate, type);
        res.status(200).json({ ticketId });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.unparkVehicle = async (req, res) => {
    try {
        const { licensePlate } = req.body;
        const fee = await parkingService.unparkVehicle(licensePlate);
        res.status(200).json({ licensePlate, fee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAvailability = async (req, res) => {
    try {
        const availableSlots = await parkingService.getAvailability();
        res.status(200).json({ availableSlots });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};