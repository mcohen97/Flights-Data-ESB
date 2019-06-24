const DataFieldsTypes = require('business-logic').DataFieldsTypes;
const Job = require('../models/job');


module.exports = class DataProcessService {

    constructor(connectionsService, filteringService) {
        this.clients = connectionsService;
        this.filteringService = filteringService;
    }

    async executeTriggers(dataReceived) {
        console.log(dataReceived.length);
        for (let data of dataReceived) {
            data = formatMessage(data);
            let clientsConnections = await this.clients.getByIata(data.AIRLINE);
                for(let client of clientsConnections){
                    let trigger = client.getTrigger();
                    if(trigger(data)){
                        let job = new Job(data,client);
                        this.filteringService.applyTransformations(job);
                    }
                }
        }
    }

    async send(job){
        console.log(job.client.username);
        let connection = await this.clients.getByUsername(job.client.username);
        job.message.MW_CHECKOUT_TIMESTAMP = Date.now();
        connection.send(job.message);
    }
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