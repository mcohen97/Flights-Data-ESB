const AirlinesClientsRepository = require('./airlines-clients-repository');

module.exports = class AirlinesServicesMemoryRepository extends AirlinesClientsRepository{
    
    constructor(){
        super();
        this.clients=[];
    }
    async getAll(){
        return this.clients.slice();
    }
    async add(airlineService){
        this.clients.push(airlineService);
    }
    async exists(clientUsername){
        return this.clients.some(c => c.username === clientUsername);
    }
}