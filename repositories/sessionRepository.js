const SessionModel = require('../models/sessionModel');

class SessionRepository {
    async create(session) {
        return await SessionModel.create(session);
    }

    async updateEnd(ticketId, endTime, fee) {
        return await SessionModel.findOneAndUpdate(
            { ticketId },
            { endTime, fee },
            { new: true }
        );
    }

    async findByLicensePlate(licensePlate) {
        return await SessionModel.findOne({ licensePlate, endTime: null });
    }
}
module.exports = new SessionRepository();