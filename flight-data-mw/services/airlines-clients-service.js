const AirlineClientDataFactory = require('../models/airline-client-data-factory');
const Jwt = require('jsonwebtoken');
const ConnectionPublisher = require('./connection-publisher');

module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.newConnections = new ConnectionPublisher('new-connections');
    }

    async add(data) {
        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data)

        await this.authentication.login(airlineClientData.username, airlineClientData.password);
        
        this.clientsRepository.add(airlineClientData);
        this.newConnections.publish(airlineClientData);

        this.authentication.deleteUsedCredential(airlineClientData.username);
        let token =Jwt.sign({ clientId: airlineClientData.username}, 'JWTSecret');
        return token;
    }
}