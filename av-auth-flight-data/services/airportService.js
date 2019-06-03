const AirportRepository = require('../repositories/repository')('airport');

module.exports = class AirportService {
    constructor() {
        this.airportRepository = new AirportRepository();
    }
    async getAll(limit, offset) {
        return await this.airportRepository.getAll(limit, offset);
    }
    async getByIataCode(id) {
        return await this.airportRepository.getByIataCode(id);
    }
}