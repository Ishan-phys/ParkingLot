const VehicleModel = require('../models/vehicleModel');

class VehicleRepository {
    async save(vehicle) {
        return await VehicleModel.findOneAndUpdate(
            { licensePlate: vehicle.licensePlate },
            { ...vehicle },
            { upsert: true, new: true }
        );
    }

    async findByLicensePlate(licensePlate) {
        return await VehicleModel.findOne({ licensePlate });
    }
}
module.exports = new VehicleRepository();