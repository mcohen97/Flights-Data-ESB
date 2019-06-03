const FlightRepository = require('../repositories/repository')('flight');
const CHACHE_SIZE_LIMIT = 100000

module.exports = class FlightService {
      constructor() {
        this.flightRepository = new FlightRepository();
        this.memoryCache = [];
        this.firstRowInMemory = 0
        this.lastRowInMemory = 0;
    }
    async getAll(limit, offset) {
        if(limit > CHACHE_SIZE_LIMIT)
            limit = CHACHE_SIZE_LIMIT;
        if (limit + offset > this.lastRowInMemory || offset < this.firstRowInMemory){
            this.firstRowInMemory = offset;
            this.lastRowInMemory = offset + CHACHE_SIZE_LIMIT;
            this.memoryCache = await this.flightRepository.getAll(CHACHE_SIZE_LIMIT,offset);
        }
        let cacheOffset = offset - this.firstRowInMemory;
        return this.memoryCache.slice(cacheOffset,cacheOffset+limit);
    }
    async getByFlightNumber(flight_number) {
        return await this.flightRepository.getByFlightNumber(flight_number);
    }
    async load(){
        this.firstRowInMemory = 0;
        this.lastRowInMemory = 100000;
        this.memoryCache = await this.flightRepository.getAll(CHACHE_SIZE_LIMIT,0)
    }
}

