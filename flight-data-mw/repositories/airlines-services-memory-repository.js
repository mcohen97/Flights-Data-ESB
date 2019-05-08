const AirlinesServicesRepository = require('./airlines-services-repository');

module.exports = class AirlinesServicesMemoryRepository extends AirlinesServicesRepository{
    
    constructor(){
        super();
        this.clients=[];
        console.log("inicializado en memoria "+ this.clients.length);
    }
    async getAll(){
        return this.clients.slice();
    }
    async add(airlineService){
        this.clients.push(airlineService);
    }
}