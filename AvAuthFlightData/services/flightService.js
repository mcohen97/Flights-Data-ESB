const FlightRepository = require('../repositories/repository')('flight');

module.exports = class FlightService {
    constructor() {
        this.flightRepository = new FlightRepository();
    }
    async getAll(limit, offset) {
        return await this.flightRepository.getAll(limit, offset);
    }
    async getByFlightNumber(flight_number) {
        return await this.flightRepository.getByFlightNumber(flight_number);
    }
}