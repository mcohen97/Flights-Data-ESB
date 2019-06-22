const Router = require('koa-router');
const AirlineController = require('./airlineController');
const AirportController = require('./airportController');
const FlightController = require('./flightController');


const router = new Router();
const airlineController = new AirlineController();
const airportController = new AirportController();
const flightController = new FlightController();



router.get('/airlines', (ctx, next) => airlineController.list(ctx, next));
router.get('/airlines/:id', (ctx, next) => airlineController.fetch(ctx, next));
router.get('/airports', (ctx, next) => airportController.list(ctx, next));
router.get('/airports/:id', (ctx, next) => airportController.fetch(ctx, next));
router.get('/flights', (ctx, next) => flightController.list(ctx, next));
router.get('/flights/:id', (ctx, next) => flightController.fetch(ctx, next));
module.exports = router;
