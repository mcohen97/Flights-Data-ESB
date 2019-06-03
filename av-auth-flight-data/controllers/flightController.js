const FlightService = require('../services/flightService');
 
module.exports = class FlightController {
    constructor() {
        this.flightService = new FlightService();
    }
    async list (ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = await this.flightService.getAll(limit, offset);
        ctx.body = { 
            offset: offset, 
            limit: limit, 
            size: list.length, 
            data: list 
        };
        await next();
    }
    async fetch (ctx, next) {
        let flight = await this.flightService.getByFlightNumber(ctx.params.id);
        ctx.body = flight;
        await next();
    }
}