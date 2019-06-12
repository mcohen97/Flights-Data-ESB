const AirportService = require('../services/airportService');
 
module.exports = class AirportController {
    constructor() {
        this.airportService = new AirportService();
    }
    async list (ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = await this.airportService.getAll(limit, offset);
        ctx.body = { 
            offset: offset, 
            limit: limit, 
            size: list.length, 
            data: list 
        };
        await next();
    }
    async fetch (ctx, next) {
        let airport = await this.airportService.getByIataCode(ctx.params.id);
        ctx.body = airport;
        await next();
    }
}