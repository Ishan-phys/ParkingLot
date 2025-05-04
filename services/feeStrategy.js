class DefaultFeeStrategy {
    calculate(session) {
        const rates = { motorcycle: 10, car: 20, bus: 50 };
        const duration = Math.ceil((session.endTime - session.startTime) / (1000 * 60 * 60));
        return duration * rates[session.vehicle.type];
    }
}
module.exports = DefaultFeeStrategy;