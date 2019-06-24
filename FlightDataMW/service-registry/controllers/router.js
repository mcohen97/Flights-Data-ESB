const express = require('express');
const Config = require('config');

const AirlinesClientsRepository = require('repositories').AirlineServices;
const ClientsCredentialsRepository = require('repositories').Credentials;
const FiltersRepository = require('repositories').Filters;

const AirlinesClientsService = require('../services/airlines-clients-service');
const AuthenticationService = require('../services/authentication-service');
const InformationService = require('../services/info-service');

const ServiceRegistry = require('./service-registry');
const ServiceAssistance = require('./service-assistance');

const router = express.Router();


const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();
const authService = new AuthenticationService(clientsCredentialsRepository,airlinesServicesRepository);
let transformationsDirectory = __dirname + Config.get("filters.transformationsDir");
let validationsDirectory = __dirname + Config.get("filters.validationsDir");
const filtersRepository = new FiltersRepository(transformationsDirectory,validationsDirectory);
const clientsService = new AirlinesClientsService(airlinesServicesRepository, authService);
const serviceRegistry = new ServiceRegistry(clientsService);
const informationService= new InformationService(filtersRepository);
const serviceAssistance = new ServiceAssistance(clientsService,informationService);

router.post('/register', (req, res) => serviceRegistry.register(req,res));
router.put('/update/:username',(req, res) => serviceAssistance.updateServiceData(req,res));
router.get('/info',(req, res) => serviceAssistance.getActionsCatalog(req,res));

module.exports = {router};