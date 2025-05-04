const { v4: uuidv4 } = require('uuid');

class Vehicle {
    constructor(licensePlate, type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
}

class ParkingSpot {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.isOccupied = false;
        this.currentVehicle = null;
    }

    assignVehicle(vehicle) {
        this.isOccupied = true;
        this.currentVehicle = vehicle;
    }

    removeVehicle() {
        this.isOccupied = false;
        this.currentVehicle = null;
    }
}

class Floor {
    constructor(floorId) {
        this.floorId = floorId;
        this.spots = [];
    }

    addSpot(spot) {
        this.spots.push(spot);
    }

    getAvailableSpot(vehicleType) {
        const sizeMap = { motorcycle: 'small', car: 'medium', bus: 'large' };
        const requiredSize = sizeMap[vehicleType];
        return this.spots.find(s => !s.isOccupied && s.size === requiredSize);
    }

    getAvailableSpotCount(type) {
        const freeSpots = this.spots.filter(s => !s.isOccupied && s.size === type).length;
        return freeSpots
    }
}

class ParkingLot {
    constructor() {
        this.floors = [];
    }

    addFloor(floor) {
        this.floors.push(floor);
    }

    findSpot(vehicleType) {
        for (const floor of this.floors) {
            const spot = floor.getAvailableSpot(vehicleType);
            if (spot) return spot;
        }
        return null;
    }

    getAllAvailableSpots() {
        const spotCounts = {
            small: 0,
            medium: 0,
            large: 0
        };
        for (const floor of this.floors) {
            spotCounts.small += floor.getAvailableSpotCount("small");
            spotCounts.medium += floor.getAvailableSpotCount("medium");
            spotCounts.large += floor.getAvailableSpotCount("large");
        }
        return spotCounts;
    }
}

class ParkingSession {
    constructor(vehicle, spot) {
        this.ticketId = uuidv4();
        this.vehicle = vehicle;
        this.spot = spot;
        this.startTime = new Date();
        this.endTime = null;
    }

    endSession() {
        this.endTime = new Date();
    }

    getDurationInHours() {
        return Math.ceil((this.endTime - this.startTime) / (1000 * 60 * 60));
    }
}

module.exports = { Vehicle, ParkingSpot, Floor, ParkingLot, ParkingSession };