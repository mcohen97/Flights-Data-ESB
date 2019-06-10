const express = require('express');
const AirlinesClientsRepository = require('../repositories/repository')('airlines-clients');
const ClientsCredentialsRepository = require('../repositories/repository')('clients-credentials');
const AirlinesClientsService = require('../services/airlines-clients-service');
const AuthenticationService = require('../services/authentication-service');
const DataProcessService =  require('../services/data-process-service');
const ServiceRegistry = require('./service-registry');
const DataProcessor = require('./data-process');
const DataFilteringService = require('../services/data-filtering-service');
const router = express.Router();

const Queue = require('bull');
const queue = new Queue("data");

const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();
const authService = new AuthenticationService(clientsCredentialsRepository,airlinesServicesRepository);
const filteringService = new DataFilteringService();

const clientsService = new AirlinesClientsService(airlinesServicesRepository, authService);
const dataProccesService = new DataProcessService(clientsService,filteringService);
const clients = new ServiceRegistry(clientsService);
const dataProcessor = new DataProcessor(dataProccesService);

router.post('/register', (req, res) => clients.register(req,res));
router.post('/publish', (req,res) => dataProcessor.publish(req,res));

let jobNumber = 1;
queue.process(2,(job,done) =>{
    console.log("job processed - "+jobNumber);
    console.log("   data length: "+job.data.length);
    jobNumber++;
    dataProccesService.executeTriggers(job.data);
    done();
})

module.exports = {router, service: clientsService};
