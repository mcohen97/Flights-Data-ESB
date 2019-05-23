const ClientConnectionFactory = require('../models/connection-factory');
const AirlineClientDataFactory = require('../models/airline-client-data-factory');
const Jwt = require('jsonwebtoken');


module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.connections= [];
    }

    async getAll() {
        return await this.clientsRepository.getAll();
    }

    async add(data) {
        let airlineClientData = AirlineClientDataFactory.createClientData(data)

        await this.authentication.login(airlineClientData.username, airlineClientData.password);
        let newConnection = ClientConnectionFactory.createConnection(airlineClientData);
        this.clientsRepository.add(airlineClientData);
        this.connections.push(newConnection);

        this.authentication.deleteUnusedCredential(airlineClientData.username);
        let token =Jwt.sign({ clientId: airlineClientData.username}, 'JWTSecret');
        return token;
    }

    updateClients(){
        let args = {
            data: { test: "hello" },
            headers: { "Content-Type": "application/json" }
        };

        this.connections.forEach(ep => {
           console.log("enviandole a :"+ep);
           ep.send(args);
       });
    }

    async loadPreviousRegisteredClients(){
        let clients =await this.clientsRepository.getAll();
        clients.forEach((c) => {
            let conn =ClientConnectionFactory.createConnection(c);
            this.connections.push(conn);
        });
    }

}