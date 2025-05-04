const { ParkingLot, Floor, ParkingSpot, Vehicle, ParkingSession } = require('../core/parking');
const DefaultFeeStrategy = require('./feeStrategy');
const vehicleRepo = require('../repositories/vehicleRepository');
const sessionRepo = require('../repositories/sessionRepository');

class ParkingLotManager {
    constructor(feeStrategy = new DefaultFeeStrategy(), floors=2) {
        this.lot = new ParkingLot();
        this.sessions = sessionRepo;
        this.vehicles = vehicleRepo;
        this.floors = floors;
        this.feeStrategy = feeStrategy;
        this.setup();
    }

    setup() {
        for (let f = 1; f <= this.floors; f++) {
            const floor = new Floor(`F${f}`);
            // Add 10 spots for small sized vehicles
            for (let s = 1; s <= 10; s++) {
                floor.addSpot(new ParkingSpot(`F${f}S${s}`, 'small'));
            }
            // Add 10 spots for medium sized vehicles
            for (let s = 11; s <= 20; s++) {
                floor.addSpot(new ParkingSpot(`F${f}S${s}`, 'medium'));
            }
            // Add 10 spots for large sized vehicles
            for (let s = 21; s <= 30; s++) {
                floor.addSpot(new ParkingSpot(`F${f}S${s}`, 'large'));
            }
            this.lot.addFloor(floor);
        }
        console.log("Setting up the parking lot complete");
    }

    async parkVehicle(licensePlate, type) {
        const vehicle = new Vehicle(licensePlate, type);
        await this.vehicles.save(vehicle);

        const spot = this.lot.findSpot(type);
        if (!spot) throw new Error("No spot available");

        spot.assignVehicle(vehicle);
        const session = new ParkingSession(vehicle, spot);

        await this.sessions.create({
            ticketId: session.ticketId,
            licensePlate: licensePlate,
            spotId: spot.id,
            startTime: session.startTime
        });

        return session.ticketId;
    }

    async unparkVehicle(licensePlate) {
        const sessionDoc = await this.sessions.findByLicensePlate(licensePlate);
        if (!sessionDoc) throw new Error("Session not found");

        const vehicle = await this.vehicles.findByLicensePlate(licensePlate);
        const spot = this.lot.findSpot(vehicle.type);

        const session = new ParkingSession(vehicle, spot);
        session.startTime = new Date(sessionDoc.startTime);
        session.endSession();

        const fee = this.feeStrategy.calculate(session);
        spot.removeVehicle();

        await this.sessions.updateEnd(sessionDoc.ticketId, session.endTime, fee);
        return fee;
    }

    async getAvailability() {
        const availableSpots = this.lot.getAllAvailableSpots();
        return availableSpots;
    }
}

module.exports = new ParkingLotManager();