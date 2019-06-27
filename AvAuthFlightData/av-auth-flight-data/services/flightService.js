const FlightRepository = require('../repositories/repository')('flight');
var config = require('config');
const CACHE_SIZE_LIMIT = config.get("repository.flights_memory_load");

module.exports = class FlightService {
      constructor() {
        this.flightRepository = new FlightRepository();
        this.memoryCache = [];
        this.firstRowInMemory = 0
        this.lastRowInMemory = 0;
    }
    async getAll(limit, offset) {
        if(limit > CACHE_SIZE_LIMIT)
            limit = CACHE_SIZE_LIMIT;
        if (limit + offset > this.lastRowInMemory || offset < this.firstRowInMemory){
            this.firstRowInMemory = offset;
            this.lastRowInMemory = offset + CACHE_SIZE_LIMIT;
            this.memoryCache = await this.flightRepository.getAll(CACHE_SIZE_LIMIT,offset);
        }
        let cacheOffset = offset - this.firstRowInMemory;
        return this.memoryCache.slice(cacheOffset,cacheOffset+limit);
    }
    async getByFlightNumber(flight_number) {
        return await this.flightRepository.getByFlightNumber(flight_number);
    }
    async load(){
        this.firstRowInMemory = 0;
        this.lastRowInMemory = CACHE_SIZE_LIMIT;
        this.memoryCache = await this.flightRepository.getAll(CACHE_SIZE_LIMIT,0)
    }
}

