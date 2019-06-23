const DataFieldsTypes = require('../data-description/flight-data-fields-types');
const Job = require('../models/job');
const Logger = require('logger')('file');
const logger = new Logger();


module.exports = class DataProcessService {

    constructor(connectionsService, filteringService) {
        this.clients = connectionsService;
        this.filteringService = filteringService;
    }

    async executeTriggers(dataReceived) {
        console.log(dataReceived.length);
        for (let data of dataReceived) {
            data = formatMessage(data);
            let connections = await this.clients.getByIata(data.AIRLINE);
            for(let connection of connections){
                let trigger = connection.getTrigger();
                if(trigger(data)){
                    filterAndValidate(this.filteringService, connection, data);
                }
            }
        }
    }

    async send(job){
        let connection = await this.clients.getByUsername(job.client.username);
        job.message.MW_CHECKOUT_TIMESTAMP = Date.now();
        connection.send(job.message);
    }
}

async function filterAndValidate(filteringService, client, data){
    let job = new Job(data,client);
    filteringService.applyTransformations(job);
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