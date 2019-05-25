//const ConnectionFactory = require('../models/connection-factory');
//const AirlineClientsService = require('../services/airlines-clients-service');
const DataFieldsTypes = require('../data-description/flight-data-fields-types');

module.exports = class DataProcessService {

    /*constructor(triggersRepository, clientsRepository){
        this.triggers = triggersRepository;
        this.clientsRepository = clientsRepository;
    }*/
    constructor(airlineClientsService) {
        this.clients = airlineClientsService;
    }

    async executeTriggers(dataReceived) {
        /*let triggers = await this.triggers.getAll();
        for(let data of dataReceived){
            for (let trigger of triggers){
                if(trigger.isExecutedBy(data))
                    this.executeTrigger(trigger,data)
            }            
        }*/
        let connections = await this.clients.getAll();
        for (let data of dataReceived) {
            data = formatMessage(data);

            connections.forEach(con => {
                let trigger = con.getTrigger();
                if (trigger(data)) {
                    console.log('mando a '+con.data.username);
                    //con.send(data);
                    con.send(data);
                }
            });
        }
    }

    /*async executeTrigger(trigger, dataToSend){     //should be in trigger model?
        let clientsUsernames = trigger.subscribers;
        let clientsData = await this.clientsRepository.getAll();
        for (let clientData of clientsData){
            if(clientsUsernames.includes(clientData.username))
                activateTrigger(trigger,dataToSend,clientData);
        }
            
    }
}

async function activateTrigger(trigger, dataToSend, clientData){
    //await transformations and filters, finally send data to client
    let connection = ConnectionFactory.createConnection(clientData);
    dataToSend.mw_checkout_timestamp = Date.now();
    let args = {
        data: { publication: dataToSend},
        headers: { "Content-Type": "application/json" }
    };
    connection.send(args);
}*/
}

function formatMessage(object) {
    let keys = Object.keys(object);
    let n = keys.length;
    let newobj = {}
    let key;
    while (n--) {
        key = keys[n];
        let data = castType(key,object);
        newobj[key.toUpperCase()] = data;
    }
    return newobj;
}

function castType(key,object){
  let dataType = DataFieldsTypes[key.toUpperCase()];
  switch(dataType){
      case Number:
        return Number(object[key]);
      break;
      default:
        return object[key];
      break;
    //add more cases if needed.
  }

}