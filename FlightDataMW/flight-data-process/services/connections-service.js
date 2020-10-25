const ClientConnectionFactory = require('../models/connection-factory');
const AirlinesIATACodes = require('business-logic').Airlines.Codes;
const ConnectionSubscriber = require('./connection-subscriber');

module.exports = class ConnectionsService {

    constructor(airlinesClientsDataRepository){
        this.clientsRepository= airlinesClientsDataRepository;
        this.connections = [];
        this.connectionsUsernameHash = [];
        this.connectionsIataHash = {};
        AirlinesIATACodes.forEach(a => this.connectionsIataHash[a] = []);
        this.newConnections = new ConnectionSubscriber('new-connections');
        this.updatedConnections = new ConnectionSubscriber('updated-connections');
        this.newConnections.subscribe((connectionData) => this.addConnection(connectionData));
        this.updatedConnections.subscribe((connectionData)=> 
        this.updateConnections(connectionData.username, connectionData.updatedData));
    }

    async getAll() {
        return this.connections;
    }

    async getByIata(iata){
        return this.connectionsIataHash[iata];
    }

    async getByUsername(username){
        return this.connectionsUsernameHash[username];
    }

    async addConnection(airlineServiceData){
        let newConnection = ClientConnectionFactory.createConnection(airlineServiceData);
        this.connections.push(newConnection);
        this.connectionsIataHash[airlineServiceData.airline].push(newConnection);
        this.connectionsUsernameHash[newConnection.username] = newConnection;
    }

    async updateConnections(username, updatedData){
        let conn =ClientConnectionFactory.createConnection(updatedData);
        for(let i = 0; i < this.connections.length; i++){
            let service = this.connections[i];
            if(service.username == username){
                updateFields(service,conn);
                break;
            }
        }
    }

    async loadPreviousRegisteredClients(){
        let clients =await this.clientsRepository.getAll();
        console.log('clientes guardados: '+clients.length);
        clients.forEach((c) => {
            let conn =ClientConnectionFactory.createConnection(c);
            this.connections.push(conn);
            this.connectionsIataHash[c.airline].push(conn);
            this.connectionsUsernameHash[c.username] = conn;
        });
    }
}

function updateFields(service, updatedData){
    for(let field in updatedData){
        service[field] = updatedData[field];
    }
}