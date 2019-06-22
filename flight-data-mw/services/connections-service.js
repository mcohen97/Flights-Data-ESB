const ClientConnectionFactory = require('../models/connection-factory');
const AirlinesIATACodes = require('../data-description/airlines').Codes;
const ConnectionSubscriber = require('./connection-subscriber');

module.exports = class ConnectionsService {

    constructor(airlinesClientsDataRepository){
        this.clientsRepository= airlinesClientsDataRepository;
        this.connectionsIataHash = {};
        AirlinesIATACodes.forEach(a => this.connectionsIataHash[a] = []);
        this.newConnections = new ConnectionSubscriber('new-connections');
        this.newConnections.subscribe((connectionData) => this.addConnection(connectionData));
    }

    async getAll() {
        return this.connections;
    }

    async getByIata(iata){
        return this.connectionsIataHash[iata];
    }

    async addConnection(airlineServiceData){
        let newConnection = ClientConnectionFactory.createConnection(airlineServiceData);
        this.connectionsIataHash[airlineServiceData.airline].push(newConnection);
    }

    async loadPreviousRegisteredClients(){
        let clients =await this.clientsRepository.getAll();
        console.log('clientes guardados: '+clients.length);
        clients.forEach((c) => {
            let conn =ClientConnectionFactory.createConnection(c);
            this.connectionsIataHash[c.airline].push(conn);
        });  
    }
}