const express = require('express');
const AirlinesClientsRepository = require('../repositories/repository')('airlines-clients');
const TriggerRepository = require('../repositories/triggers-memory-repository');
const ClientsCredentialsRepository = require('../repositories/repository')('clients-credentials');
const AirlinesClientsService = require('../services/airlines-clients-service');
const AuthenticationService = require('../services/authentication-service');
const DataProcessService =  require('../services/data-process-service');
const ServiceRegistry = require('./service-registry');
const DataProcessor = require('./data-process');
const router = express.Router();

const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();
const triggersRepository = new TriggerRepository();
const authService = new AuthenticationService(clientsCredentialsRepository,airlinesServicesRepository);

const service = new AirlinesClientsService(airlinesServicesRepository, authService);
const dataProccesService = new DataProcessService(service);
const clients = new ServiceRegistry(service);
const dataProcessor = new DataProcessor(dataProccesService);

router.post('/register', (req, res) => clients.register(req,res));
router.post('/publish', (req,res) => dataProcessor.publish(req,res));

module.exports = {router, service};