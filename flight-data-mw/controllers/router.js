const express = require('express');
const AirlinesClientsRepository = require('../repositories/repository')('airlines-clients');
const ClientsCredentialsRepository = require('../repositories/repository')('clients-credentials');
const AirlinesClientsService = require('../services/airlines-clients-service');
const AuthenticationService = require('../services/authentication-service');
const ServiceRegistry = require('./service-registry');
const DataFilteringService = require('../services/data-filtering-service');
const ConnectionsService = require('../services/connections-service');

const router = express.Router();

const Queue = require('bull');
const queue = new Queue("data");

const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();
const authService = new AuthenticationService(clientsCredentialsRepository,airlinesServicesRepository);
const filteringService = new DataFilteringService();
const connectionsService = new ConnectionsService(airlinesServicesRepository);
const clientsService = new AirlinesClientsService(airlinesServicesRepository, authService,connectionsService);
const clients = new ServiceRegistry(clientsService);

let jobNumber = 1;

router.post('/register', (req, res) => clients.register(req,res));
queue.process(2,(job,done) =>{
    console.log("job processed - "+jobNumber);
    console.log("   data length: "+job.data.length);
    jobNumber++;
    dataProccesService.executeTriggers(job.data);
    done();
})

module.exports = {router, service: connectionsService};
