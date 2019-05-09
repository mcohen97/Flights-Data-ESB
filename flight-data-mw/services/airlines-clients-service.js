module.exports = class AirlinesClientsService {
    constructor(airlinesClientsRepository) {
        this.clientsRepository = airlinesClientsRepository;
    }
    async getAll() {
        return await this.clientsRepository.getAll();
    }
    async add(airlineService) {
        return await this.clientsRepository.add(airlineService);
    }
}