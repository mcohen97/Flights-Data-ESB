const AirlinesClientsRepository = require('./airlines-clients-repository');
const DBContext = require('./db-context');


module.exports = class AirlinesServicesMongoDBRepository extends AirlinesClientsRepository{
    
    constructor(){
        super();
        this.airlineClients= DBContext.AirlineClient;
    }
    async getAll(){
        let query = this.airlineClients.find();
        let airlineClients = await query;
        return airlineClients.map((airlineClient) => airlineClient.toObject());
    }
    async add(airlineService){
        let newClient = await this.airlineClients.create(airlineService);
        return newClient.toObject();
    }
    async exists(clientUsername){
        let found = await this.airlineClients.findOne({username:clientUsername});
        return found ? true : false;
    }
}