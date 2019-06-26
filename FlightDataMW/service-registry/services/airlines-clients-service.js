const AirlineClientDataFactory = require('business-logic').ServiceFactory;
const jwt = require('jsonwebtoken');
const ConnectionPublisher = require('./connection-publisher');
const Config = require('config');
const Logger = require('logger')(Config.get('logger.type'));
const logger = new Logger();

module.exports = class AirlinesClientsService {

    constructor(airlinesClientsDataRepository, authenticationService) {
        this.clientsRepository = airlinesClientsDataRepository;
        this.authentication = authenticationService;
        this.newConnections = new ConnectionPublisher('new-connections');
        this.updatedConnections= new ConnectionPublisher('updated-connections');
    }

    async add(data) {
        try{
        await this.authentication.login(data.username, data.password);

        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data);
        
        await this.clientsRepository.add(airlineClientData);
        await this.newConnections.publish(airlineClientData);

        await this.authentication.deleteUsedCredential(airlineClientData.username);
        logger.logInfo(`Service registered successfully, used credentials: ${data.username}`);
        let token =jwt.sign({ clientId: airlineClientData.username}, Config.get('credentials.secret'));
        return token;
        }catch(error){
            logger.logError(`Username used: ${data.username}, error: ${error.message}`);
            throw error;
        }
    }

    async update(username,data){
        let exists = await this.clientsRepository.exists(username);
        //validate and format data with factory.
        let airlineClientData = AirlineClientDataFactory.createClientData(data);     
        if(!exists){
            throw new Error('Cannot update, service does not exist');
        }else{
            try{
                await this.clientsRepository.update(airlineClientData);
                this.updatedConnections.publish({username:username, updatedData:data});
            }catch(error){
                logger.logError(`error: ${error.message}, while trying to update its data`);
                throw error;
            }
        }
        return true;
    }
}