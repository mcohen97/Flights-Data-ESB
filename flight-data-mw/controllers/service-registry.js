const AirlineClient = require('../models/airline-rest-client');

module.exports = class ServiceRegistry{

    constructor(airlineServiceStorage){
        this.clients = airlineServiceStorage;
    }

    async register(req,res){
        let body = req.body;
        console.log(body);
        this.clients.add(new AirlineClient(body.token,body.url,body.port,undefined));
        res.status(200);
        res.json({
            message: 'registration successful!'
        });
    }
}