const express = require('express');
const Logger = require('logger')('file');
const logger = new Logger();

const AirlinesClientsRepository = require('../repositories/repository')('airlines-clients');
const ClientsCredentialsRepository = require('../repositories/repository')('clients-credentials');
const AirlinesClientsService = require('../services/airlines-clients-service');
const AuthenticationService = require('../services/authentication-service');
const ServiceRegistry = require('./service-registry');
const ServiceAssistance = require('./service-assistance');
const DataFilteringService = require('../services/data-transformation-service');
const ConnectionsService = require('../services/connections-service');
const DataProcessService = require('../services/data-process-service');
const FiltersRepository = require('../repositories/filters-repository');
const InformationService = require('../services/info-service');
const ClientConnectionFactory = require('../models/connection-factory');



const router = express.Router();

const Queue = require('bull');
const incomingDataQueue = new Queue("data");
const readyToSendQueue = new Queue("readyToSend");

const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();
const authService = new AuthenticationService(clientsCredentialsRepository,airlinesServicesRepository);
const filtersRepository = new FiltersRepository();
const filteringService = new DataFilteringService(filtersRepository);
const connectionsService = new ConnectionsService(airlinesServicesRepository);
const clientsService = new AirlinesClientsService(airlinesServicesRepository, authService,connectionsService);
const serviceRegistry = new ServiceRegistry(clientsService);
const informationService= new InformationService(filtersRepository);
const serviceAssistance = new ServiceAssistance(clientsService,informationService);
const dataProccesService = new DataProcessService(connectionsService,filteringService);

router.post('/register', (req, res) => serviceRegistry.register(req,res));
router.put('/update/:username',(req, res) => serviceAssistance.updateServiceData(req,res));
router.get('/info',(req, res) => serviceAssistance.getActionsCatalog(req,res));

incomingDataQueue.process((bullJob,done) =>{
    let dataList = bullJob.data
    dataProccesService.executeTriggers(dataList);
    done();
});
readyToSendQueue.process((bullJob,done) =>{
    let job = bullJob.data;
    dataProccesService.send(job);
    done();
});

module.exports = {router, service: connectionsService};


filtersRepository.onTransformationAdded(texty => console.log(texty));