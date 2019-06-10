const ClientConnectionFactory = require('../models/connection-factory');
const AirlineClientDataFactory = require('../models/airline-client-data-factory');
const AirlinesIATACodes = require('../data-description/airlines').Codes;
const Jwt = require('jsonwebtoken');


module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.connections= [];
        this.connectionsIataHash = {};
        AirlinesIATACodes.forEach(a => this.connectionsIataHash[a] = []);
    }

    async getAll() {
        return this.connections;
    }

    async getByIata(iata){
        return this.connectionsIataHash[iata];
    }

    async add(data) {
        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data)
        console.log(airlineClientData);

        await this.authentication.login(airlineClientData.username, airlineClientData.password);
        
        let newConnection = ClientConnectionFactory.createConnection(airlineClientData);
        this.clientsRepository.add(airlineClientData);
        this.connections.push(newConnection);
        this.connectionsIataHash[airlineClientData.airline].push(newConnection);

        this.authentication.deleteUsedCredential(airlineClientData.username);
        let token =Jwt.sign({ clientId: airlineClientData.username}, 'JWTSecret');
        return token;
    }

    updateClients(){
        let args = {
            data: { test: "hello" },
            headers: { "Content-Type": "application/json" }
        };
        this.connections.forEach(ep => {
           ep.send(args);
       })
    }

    async loadPreviousRegisteredClients(){
        let clients =await this.clientsRepository.getAll();
        console.log('clientes guardados: '+clients.length);
        clients.forEach((c) => {
            let conn =ClientConnectionFactory.createConnection(c);
            this.connections.push(conn);
            this.connectionsIataHash[c.airline].push(conn);
        });
    }

}