const ConnectionFactory = require('../models/connection-factory');

module.exports = class DataProcessService{
    
    constructor(triggersRepository, clientsRepository){
        this.triggers = triggersRepository;
        this.clientsRepository = clientsRepository;
    }

    async executeTriggers(dataReceived){
        let triggers = await this.triggers.getAll();
        for(let data of dataReceived){
            for (let trigger of triggers){
                if(trigger.isExecutedBy(data))
                    this.executeTrigger(trigger,data)
            }            
        }
            
    }

    async executeTrigger(trigger, dataToSend){     //should be in trigger model?
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
}

