const FlightRepository = require('../repositories/repository')('flight');

module.exports = class FlightService {
      constructor() {
        this.flightRepository = new FlightRepository();
        this.memoryCache = [];
        this.firstRowInMemory = 0
        this.lastRowInMemory = 0;
    }
    async getAll(limit, offset) {
        if(limit > 100000)
            limit = 100000;
        if (limit + offset > this.lastRowInMemory || offset < this.firstRowInMemory){
            this.firstRow = offset;
            this.lastRowInMemory = offset + 100000;
            this.memoryCache = await this.flightRepository.getAll(limit,100000);
        }
        return this.memoryCache.slice(offset,offset+limit);
    }
    async getByFlightNumber(flight_number) {
        return await this.flightRepository.getByFlightNumber(flight_number);
    }
}
