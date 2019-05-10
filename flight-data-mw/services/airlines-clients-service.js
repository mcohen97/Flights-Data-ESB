const AirlineClient = require('../models/airline-rest-client');
const jwt = require('jsonwebtoken');


module.exports = class AirlinesClientsService {
    constructor(airlinesClientsRepository, clientsCredentialsRepository) {
        this.clientsRepository = airlinesClientsRepository;
        this.credentialsRepository = clientsCredentialsRepository;
    }
    async getAll() {
        return await this.clientsRepository.getAll();
    }
    async add(airlineService) {
        let username = airlineService.username;
        let password = airlineService.password;

        if(!(await this.credentialsRepository.exists(username))){
            throw new Error('client not found');
        }
        //check there are not more than one clientservices subscribed with the same credentials.
        if(await this.clientsRepository.exists(username)){
            throw new Error('client already subscribed');
        }
        let credentials = await this.credentialsRepository.get(username);
        if(credentials.password != password){
            throw new Error('incorrect password');
        }

        let clientToken=airlineService.token;
        let url=airlineService.url;
        let port = airlineService.port;

        this.clientsRepository.add(new AirlineClient(clientToken,url,port,credentials,undefined));

        let token =jwt.sign({ clientId: username}, 'OrtJWTSecretShh');
        return token;
    }

    run(){
        this.getAll()
            .then(clients => {
                updateClients(clients);
            });
    }
}

function updateClients(clients){
    let args = {
        data: { test: "hello" },
        headers: { "Content-Type": "application/json" }
    };
    console.log('clientes '+ clients);
    clients.forEach(ep => {
       console.log("enviandole a :"+ep);
       ep.send(args);
   });
}