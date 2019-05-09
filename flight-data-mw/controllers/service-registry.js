const AirlineClient = require('../models/airline-client');

module.exports = class ServiceRegistry{

    constructor(airlineServiceStorage){
        this.clients = airlineServiceStorage;
    }

    async register(req,res){
        this.clients.add(new AirlineClient());
        res.status(200);
        res.json({
            message: 'registration successful!'
        });
    }
}