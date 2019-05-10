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

    run(){
        this.getAll()
            .then(clients => {
                updateClients(clients);
            });
    }
}

function updateClients(endpoints){
    let args = {
        data: { test: "hello" },
        headers: { "Content-Type": "application/json" }
    };
    console.log('clientes '+ endpoints);
   endpoints.forEach(ep => {
       console.log("enviandole a :"+ep);
       ep.send(args);
   });
}