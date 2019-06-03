const AirlineRepository = require('../repositories/repository')('airline');

module.exports = class AirlineService {
    constructor() {
        this.airlineRepository = new AirlineRepository();
    }
    async getAll(limit, offset) {
        return await this.airlineRepository.getAll(limit, offset);
    }
    async getByIataCode(id) {
        return await this.airlineRepository.getByIataCode(id);
    }
}