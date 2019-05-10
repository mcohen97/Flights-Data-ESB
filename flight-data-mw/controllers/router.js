const express = require('express');
const AirlinesClientsRepository = require('../repositories/airlines-clients-memory-repository');
const AirlinesClientsService = require('../services/airlines-clients-service');
const ServiceRegistry = require('./service-registry');
const router = express.Router();

const repository = new AirlinesClientsRepository();
const service = new AirlinesClientsService(repository);
const clients = new ServiceRegistry(service);

router.post('/register', (req, res) => clients.register(req,res));

module.exports = {router, service};