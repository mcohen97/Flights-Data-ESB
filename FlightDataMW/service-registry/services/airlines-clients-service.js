const AirlineClientDataFactory = require('business-logic').ServiceFactory;
const jwt = require('jsonwebtoken');
const ConnectionPublisher = require('./connection-publisher');
const Config = require('config');

module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.newConnections = new ConnectionPublisher('new-connections');
        this.updatedConnections= new ConnectionPublisher('updated-connections');
    }

    async add(data) {
 
        await this.authentication.login(airlineClientData.username, airlineClientData.password);

        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data);
        
        this.clientsRepository.add(airlineClientData);
        this.newConnections.publish(airlineClientData);

        this.authentication.deleteUsedCredential(airlineClientData.username);
        let token =jwt.sign({ clientId: airlineClientData.username}, Config.get('credentials.secret'));
        return token;
    }

    async update(username,data){
        let exists = await this.clientsRepository.exists(username);
        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data);     
        if(!exists){
            throw new Error('Cannot update, service does not exist');
        }else{
            this.clientsRepository.update(airlineClientData);
            this.updatedConnections.publish({username:username, updatedData:data});
        }
        return true;
    }
}