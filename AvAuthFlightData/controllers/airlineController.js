const AirlineService = require('../services/airlineService');
 
module.exports = class AirlineController {
    constructor() {
        this.airlineService = new AirlineService();
    }
    async list (ctx, next) {
        let limit = parseInt(ctx.query.limit) || 100;
        let offset = parseInt(ctx.query.offset) || 0;
        let list = await this.airlineService.getAll(limit, offset);
        ctx.body = { 
            offset: offset, 
            limit: limit, 
            size: list.length, 
            data: list 
        };
        await next();
    }
    async fetch (ctx, next) {
        let airline = await this.airlineService.getByIataCode(ctx.params.id);
        ctx.body = airline;
        await next();
    }
}