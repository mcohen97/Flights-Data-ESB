const ClientConnectionFactory = require('../models/connection-factory');
const jwt = require('jsonwebtoken');


module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.connections=[];
    }

    async getAll() {
        return await this.clientsRepository.getAll();
    }
    async add(airlineClientData) {
        await this.authentication.login(airlineClientData.username, airlineClientData.password);
        let newConnection = ClientConnectionFactory.createConnection(airlineClientData);
        this.clientsRepository.add(airlineClientData);
        console.log(this.connections);
        this.connections.push(newConnection);
        console.log(this.connections);
        this.authentication.deleteUnusedCredential(airlineClientData.username);
        let token =jwt.sign({ clientId: airlineClientData.username}, 'JWTSecret');
        return token;
    }

    updateClients(){
        let args = {
            data: { test: "hello" },
            headers: { "Content-Type": "application/json" }
        };
        console.log('clientes '+ this.connections);

        this.connections.forEach(ep => {
           console.log("enviandole a :"+ep);
           ep.send(args);
       });
    }

}