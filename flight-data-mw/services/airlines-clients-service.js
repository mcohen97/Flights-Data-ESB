const AirlinesClientsRepository = require('../repositories/airlines-clients-repository');

module.exports = class AirlinesClientsService {
    constructor() {
        this.clientsRepository = new AirlinesClientsRepository();
    }
    async getAll() {
        return await this.getAll();
    }
    async add(airlineService) {
        return await this.clientsRepository.add(airlineService);
    }
}