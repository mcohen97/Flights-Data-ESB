const express = require('express');
const AirlinesClientsRepository = require('../repositories/repository')('airlines-clients');
const ClientsCredentialsRepository = require('../repositories/repository')('clients-credentials');
const AirlinesClientsService = require('../services/airlines-clients-service');
const ServiceRegistry = require('./service-registry');
const router = express.Router();

const airlinesServicesRepository = new AirlinesClientsRepository();
const clientsCredentialsRepository = new ClientsCredentialsRepository();

const service = new AirlinesClientsService(airlinesServicesRepository, clientsCredentialsRepository);
const clients = new ServiceRegistry(service);

router.post('/register', (req, res) => clients.register(req,res));

module.exports = {router, service};